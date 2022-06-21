import {
  fileExists,
  getApplocationUrl,
  getRepoInfoFromUrl,
  getUrlFromFilepath,
  isValidJson,
  jmespathSearch,
  loadFrameworksDefinitions,
  loadProjectFiles,
  normalizeUrl,
  path,
  readFile,
  safeParseJson,
} from "./utils";

const PACKAGE_JSON_FILENAME = "package.json";

enum FrameworkIds {
  static='static',
  nodejs='nodejs',
  dotnet='dotnet',
  python='python',
  django='django',
  angular='angular',
  angularUniversal='angular-universal',
  ionicAngular='ionic-angular',
  scully='scully',
  react='react',
  preact='preact',
  vue='vue',
  nuxtjs='nuxtjs',
  vuepress='vuepress',
  aurelia='aurelia',
  elm='elm',
  ember='ember',
  flutter='flutter',
  hugo='hugo',
  knockoutjs='knockoutjs',
  lit='lit',
  marko='marko',
  meteor='meteor',
  mithril='mithril',
  polymer='polymer',
  riot='riot',
  stencil='stencil',
  svelte='svelte',
  typescript='typescript',
  azureFunctions='azure-functions'
};

export function recommendService (frameworks: FrameworkMatch[], projectUrl: string): RecommendationType {
  let recommendation: RecommendationType = 'webapp';
  const frameworkObj: Record<string, FrameworkMatch> = {};

  for(const match of frameworks) {
    frameworkObj[match.framework.id] = match;
  }

  if(isSWAService(frameworkObj, projectUrl)) {
    recommendation = 'staticwebapp';
  }

  return recommendation;
}

/**
 * Inspect which framework is being used in a project, based on common npm dependencies (and devDependencies) listed in package.json.
 * Note: A list of known npm dependencies (and devDependencies) must be provided in the framework dictionary, in the `package.dependencies` property!
 *
 * @param projectRootUrl The root directory of the project to inspect.
 * @param matchAll If true, all frameworks will be inspected, otherwise only relevant match will be returned.
 * @param frameframewokDefinitionsworks A list of frameworks definitions.
 * @param projectFiles A list of files in the project.
 * @returns The matched framework, or NULL if no match is found.
 */
export async function inspect(
  projectRootUrl: string,
  framewokDefinitions: FrameworkDefinition[] = [],
  matchAll = false,
  projectFiles: string[] = []
): Promise<FrameworkMatch[]> {
  let foundFrameworks: FrameworkMatch[] = [];
  const toIgnoreIfMultipleFrameworksFound: string[] = ["nodejs", "typescript" /* other frameworks with variants will be added later (see below) */];

  if (framewokDefinitions.length === 0) {
    const json = JSON.parse(JSON.stringify(loadFrameworksDefinitions()));
    if('default' in json) {
      // tslint:disable-next-line:no-string-literal
      framewokDefinitions = json['default'];
    }
  }

  if (projectFiles.length === 0) {
    projectFiles = await loadProjectFiles(projectRootUrl);
  }

  const rootPackageJsonPath = normalizeUrl(PACKAGE_JSON_FILENAME);
  const hasRootPackageJson = fileExists(rootPackageJsonPath);

  if (!hasRootPackageJson) {
    // TODO: some frameworks might not have a package.json file, but must be detected.
    // TODO: project does not have a root package.json, this could be either:
    // - a different technology (python, java...)
    // - a simple folder
    console.warn(`No package.json file found at the root of the project.`);
  }
  
  for (const framework of framewokDefinitions) {
    
    for (const fileUrl of projectFiles) {
      
      const frameworkMatchByPackageJson = await inspectByPackageJSONIfExists(framework, projectRootUrl, fileUrl);
      if (frameworkMatchByPackageJson) {
        foundFrameworks = insertOrUpdateMatchedFramwork(await getMatchedFrameworkObject(projectRootUrl, framework, fileUrl), foundFrameworks);
      }

      const frameworkMatchByConfigurationFiles = await inspectByConfigurationFileIfExists(framework, projectRootUrl, fileUrl);
      if (frameworkMatchByConfigurationFiles) {
        foundFrameworks = insertOrUpdateMatchedFramwork(await getMatchedFrameworkObject(projectRootUrl, framework, fileUrl), foundFrameworks);
      }

      const frameworkMatchByIndexHtml = await inspectByIndexHtml(framework, projectRootUrl, fileUrl);
      if (frameworkMatchByIndexHtml) {
        foundFrameworks = insertOrUpdateMatchedFramwork(await getMatchedFrameworkObject(projectRootUrl, framework, fileUrl), foundFrameworks);
      }

      if (frameworkMatchByPackageJson || frameworkMatchByConfigurationFiles || frameworkMatchByIndexHtml) {
        if (framework.variant?.length) {
          toIgnoreIfMultipleFrameworksFound.push(framework.id);

          for (const variant of framework.variant) {
            const variantFrameworkDefinition = framewokDefinitions.find((fwk) => fwk.id === variant);

            if (variantFrameworkDefinition) {
              // if we find a framework, let's check for its variants.
              // framework variants can share some dependencies or configuration files with the parent framework
              // we need to inspect the project for additional configuration files.
              // finding any addition configuration files means that this is a variant framework!
              const foundVariantFramrworks = await inspect(projectRootUrl, [variantFrameworkDefinition], matchAll, projectFiles);
              foundFrameworks = insertOrUpdateMatchedFramwork(await getMatchedFrameworkObject(projectRootUrl, framework, fileUrl), [
                ...foundFrameworks,
                ...foundVariantFramrworks,
              ]);
            }
          }
        }
      }
    }
  }

  if (foundFrameworks.length === 1) {
    return foundFrameworks;
  } else if (foundFrameworks.length > 1) {
    if (matchAll) {
      return foundFrameworks;
    } else {
      // if we detect multiple frameworks and the user wants the relevant ones only, we need to filter out the ones we want to ignore.
      return foundFrameworks.filter((f) => toIgnoreIfMultipleFrameworksFound.includes(f.framework.id) === false);
    }
  }

  return [];
}

function isPackageJsonFile(filepath: string) {
  return (
    // make sure the file is a package.json file
    filepath.endsWith(PACKAGE_JSON_FILENAME) &&
    // make sure the file exists
    fileExists(filepath)
  );
}

/**
 * Inspect which framework is being used in a project, based on common npm dependencies (and devDependencies) listed in package.json.
 * Note: A list of known npm dependencies (and devDependencies) must be provided in the framework dictionary, in the `package.dependencies` property!
 *
 * @param framework A framework definition to match.
 * @param root The root directory of the project to inspect.
 * @param fileUrl The absolute URL of the package.json file to inspect.
 * @returns The matched framework definition, or NULL if no match is found.
 */
async function inspectByPackageJSONIfExists(framework: FrameworkDefinition, root: string, fileUrl: string): Promise<FrameworkMatch | null> {
  const isPackageJson = isPackageJsonFile(fileUrl);
  if (!isPackageJson) {
    return null;
  }

  const jsonContentRaw = await readFile(fileUrl);

  if (isValidJson(jsonContentRaw) === false) {
    console.warn(`[${framework.name}] Could not parse JSON file: ${fileUrl}`);
    return null;
  }

  const packageJson = safeParseJson(jsonContentRaw || "{}");
  const extractedDependencies = packageJson.dependencies || {};
  const extractedDevDependencies = packageJson.devDependencies || {};
  const extractedDependenciesKeys = [...Object.keys(extractedDependencies), ...Object.keys(extractedDevDependencies)];
  const extractedEntryKey = packageJson[framework.package?.entryKey!];

  if (extractedDependenciesKeys.length === 0) {
    // if the package.json file does not have any dependencies, we mark it as a match, if the framework is Node.js
    if (framework.id === "nodejs") {
      return getMatchedFrameworkObject(root, framework, fileUrl);
    }

    return null;
  } else if (extractedEntryKey) {
    return getMatchedFrameworkObject(root, framework, fileUrl);
  } else if (extractedDependenciesKeys.length) {
    const matchedDependencies = framework.package?.dependencies.filter((value) => extractedDependenciesKeys.includes(value));

    if (matchedDependencies?.length) {
      return getMatchedFrameworkObject(root, framework, fileUrl);
    }
  }

  return null;
}

/**
 * Inspect which framework is being used in a project, based on common configuration files.
 * Note: A list of known configuration files must be provided in the framework dictionary, in the `configFiles` property!
 *
 * @param framework A framework definition to match.
 * @param root The root directory of the project to inspect.
 * @param fileUrl The absolute URL of the file to inspect.
 * @returns The matched framework definition, or NULL if no match is found.
 */
async function inspectByConfigurationFileIfExists(framework: FrameworkDefinition, root: string, fileUrl: string): Promise<FrameworkMatch | null> {
  // some SSG/SSR frameworks are built on top of other frameworks (Angular, Vue, React, etc).
  // So in order to avoid false positives, we need to check if the framework has a specific config file before we move on.
  // if so, we need to check if the file exists,
  // and if it does, we need to extract (or infer) the correct configuration.

  const hasConfigFile = hasConfigurationFiles(framework, fileUrl);
  if (!hasConfigFile) {
    return null;
  }

  const outputPath = await evaluateOutputLocation(framework, root);
  if (outputPath === null) {
    return null;
  }

  // Read the file content and search for occurrences of dependencies from the framework definition.
  if (framework.package?.dependencies) {
    for (const dependencie of framework.package?.dependencies!) {
      // Note: if fileUrl is a git tree (or a directory), readFile will return null
      const configurationFileContent = await readFile(fileUrl);
      if (configurationFileContent) {
        if (configurationFileContent.includes(dependencie)) {
          return getMatchedFrameworkObject(root, framework, fileUrl);
        }
      } else {
        if (fileUrl.includes("tree") && hasConfigFile) {
          return getMatchedFrameworkObject(root, framework, fileUrl);
        }
      }
    }
  }

  // if no dependencies are defined, we assume that the framework defintion does not require any dependencies for a match.
  return hasConfigFile ? getMatchedFrameworkObject(root, framework, fileUrl) : null;
}

async function inspectByIndexHtml(framework: FrameworkDefinition, root: string, filename: string): Promise<FrameworkMatch | null> {
  const isStaticDefintion = framework.id === "static";
  if (!isStaticDefintion) {
    return null;
  }

  for (const indexHtmlFile of framework?.configFiles!) {
    if (filename.endsWith(indexHtmlFile)) {
      return getMatchedFrameworkObject(root, framework, filename);
    }
  }

  return null;
}

/**
 * Check if a project contains all configuration files listed in the framework definition (`configFiles` property).
 *
 * @param framework A framework definition to match.
 * @param filename The file name to check.
 * @returns True if the current project has at least one configuration file that is provided in the framework definition.
 */
function hasConfigurationFiles(framework: FrameworkDefinition, filename: string): boolean {
  if (!framework.configFiles) return false;

  let matchedFiles = 0;

  for (const configFile of framework.configFiles) {
    if (configFile.includes("*")) {
      // we have a wildcard (glob), convert it to a valid regex
      const regex =
        configFile
          // replace - with \-
          .replace(/\-/g, "-")
          // replace / with \/
          .replace(/\//g, "/")
          // replace . with \.*
          .replace(/\./g, ".")
          // replace * with (.*)
          .replace(/\*/g, "(.*)") +
        // add trailing $
        "$";
      const isMatch = new RegExp(regex, "ig").test(filename);

      if (isMatch) {
        matchedFiles++;
      }
    } else if (filename?.endsWith(configFile)) {
      matchedFiles++;
    }
  }

  // just check that at least 1 file has been found
  return matchedFiles > 0;
}

/**
 * Evaluates dynamic path (using jmespath). The expression must to be of format:
 *
 * ```{jsonFile#expression}```:
 * - `jsonFile` is the filename to the file that contains the json content
 * - `expression` is the jmespath expression path to evaluate
 *
 * @example
 * ```
 * { "outputLocation": "dist/{angular.json#values(projects)[0].architect.build.options.outputPath}" }
 * ```
 * @see https://jmespath.org/
 * @param framework A framework definition to match.
 * @param root The root directory of the project to inspect.
 * @returns The evaluated path extracted from the jmespath expression.
 */
async function evaluateOutputLocation(framework: FrameworkDefinition, root: string): Promise<string> {

  if (!framework.outputLocation) {
    return "./";
  }

  if (framework.outputLocation.includes("{") === false) {
    return framework.outputLocation;
  }

  const startOfExpression = framework.outputLocation.indexOf("{");
  const endOfExpression = framework.outputLocation.indexOf("}");
  const expression = framework.outputLocation.substring(startOfExpression + 1, endOfExpression).trim();
  const [jsonFileToParse, jmespathExpression] = expression.split("#");
  const jsonFileToParsePath = path.join(root, jsonFileToParse.trim());
  const jsonContentRaw = await readFile(jsonFileToParsePath);

  if (jsonContentRaw) {
    if (isValidJson(jsonContentRaw)) {
      const jsonContent = safeParseJson(jsonContentRaw);
      const outputLocation = (await jmespathSearch(jsonContent, jmespathExpression.trim())) || "./";
      return outputLocation;
    }

    console.warn(`[${framework.name}] Could not parse JSON file: ${jsonFileToParsePath}`);
  }
  return "./";
}

function insertOrUpdateMatchedFramwork(matchedFramework: FrameworkMatch, matchedFrameworks: FrameworkMatch[]) {
  // if matchedFramework in already in the list, merge the matchedFiles

  const existingFramework = matchedFrameworks.find((value) => value.framework.id === matchedFramework.framework.id);
  if (existingFramework) {
    existingFramework.matchedFiles = [...new Set([...existingFramework.matchedFiles, ...matchedFramework.matchedFiles])];
  } else {
    matchedFrameworks.push(matchedFramework);
  }
  return matchedFrameworks;
}

async function getMatchedFrameworkObject(projectRootUrl: string, framework: FrameworkDefinition, filepath: string): Promise<FrameworkMatch> {
  const fileUrl = getUrlFromFilepath(filepath);
  const appLocation = getApplocationUrl(filepath);
  const { repo, owner } = getRepoInfoFromUrl(projectRootUrl);

  return {
    repo,
    owner,
    deployment: {
      appLocation,
      outputLocation: await evaluateOutputLocation(framework, projectRootUrl),
    },
    matchedFiles: [fileUrl],
    framework,
  };
}

function isSWAService(frameworks: Record<string, FrameworkMatch>, projectUrl: string) {
  console.log(`Url: ${projectUrl}`);
  const totalFrameworks = Object.keys(frameworks).length;
  
  // For SWA, the repo should have some static content
  if(frameworks[FrameworkIds.static]) {
    // Static Code only
    if(totalFrameworks === 1) {
      return true;
    }

    // Static Code with Azure Functions
    if(totalFrameworks === 2 && frameworks[FrameworkIds.azureFunctions]) {
      return true;
    }
    
    // Static Code with JavaScript
    if(frameworks[FrameworkIds.nodejs]) {
      const frameworksWithoutDependencies = Object.keys(frameworks).filter(key => !frameworks[key].framework.package?.dependencies);
      // Static code with JS and Azure Functions
      if(frameworks[FrameworkIds.azureFunctions]) {
        
        // Only host.json file
        if(totalFrameworks === 3) {
          return true;
        }

        // Azure functions has some code in a different language
        if(totalFrameworks === 4 && frameworksWithoutDependencies.length > 4) {
          return false;
        } else {
          return true;
        }
      
        // Static code + JS only
      } else if(frameworksWithoutDependencies.length === 2) {
        return true;
      }
    }
  }
  
  return false;
}