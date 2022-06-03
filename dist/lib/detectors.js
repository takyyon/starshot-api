"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = void 0;
const utils_1 = require("./utils");
const PACKAGE_JSON_FILENAME = "package.json";
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
async function inspect(projectRootUrl, framewokDefinitions = [], matchAll = false, projectFiles = []) {
    var _a;
    let foundFrameworks = [];
    const toIgnoreIfMultipleFrameworksFound = ["nodejs", "typescript" /* other frameworks with variants will be added later (see below) */];
    if (framewokDefinitions.length === 0) {
        framewokDefinitions = (0, utils_1.loadFrameworksDefinitions)();
    }
    if (projectFiles.length === 0) {
        projectFiles = await (0, utils_1.loadProjectFiles)(projectRootUrl);
    }
    const rootPackageJsonPath = (0, utils_1.normalizeUrl)(PACKAGE_JSON_FILENAME);
    const hasRootPackageJson = (0, utils_1.fileExists)(rootPackageJsonPath);
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
                if ((_a = framework.variant) === null || _a === void 0 ? void 0 : _a.length) {
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
    }
    else if (foundFrameworks.length > 1) {
        if (matchAll) {
            return foundFrameworks;
        }
        else {
            // if we detect multiple frameworks and the user wants the relevant ones only, we need to filter out the ones we want to ignore.
            return foundFrameworks.filter((f) => toIgnoreIfMultipleFrameworksFound.includes(f.framework.id) === false);
        }
    }
    return [];
}
exports.inspect = inspect;
function isPackageJsonFile(filepath) {
    return (
    // make sure the file is a package.json file
    filepath.endsWith(PACKAGE_JSON_FILENAME) &&
        // make sure the file exists
        (0, utils_1.fileExists)(filepath));
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
async function inspectByPackageJSONIfExists(framework, root, fileUrl) {
    var _a, _b;
    const isPackageJson = isPackageJsonFile(fileUrl);
    if (!isPackageJson) {
        return null;
    }
    const jsonContentRaw = await (0, utils_1.readFile)(fileUrl);
    if ((0, utils_1.isValidJson)(jsonContentRaw) === false) {
        console.warn(`[${framework.name}] Could not parse JSON file: ${fileUrl}`);
        return null;
    }
    const packageJson = (0, utils_1.safeParseJson)(jsonContentRaw || "{}");
    const extractedDependencies = packageJson.dependencies || {};
    const extractedDevDependencies = packageJson.devDependencies || {};
    const extractedDependenciesKeys = [...Object.keys(extractedDependencies), ...Object.keys(extractedDevDependencies)];
    const extractedEntryKey = packageJson[(_a = framework.package) === null || _a === void 0 ? void 0 : _a.entryKey];
    if (extractedDependenciesKeys.length === 0) {
        // if the package.json file does not have any dependencies, we mark it as a match, if the framework is Node.js
        if (framework.id === "nodejs") {
            return getMatchedFrameworkObject(root, framework, fileUrl);
        }
        return null;
    }
    else if (extractedEntryKey) {
        return getMatchedFrameworkObject(root, framework, fileUrl);
    }
    else if (extractedDependenciesKeys.length) {
        const matchedDependencies = (_b = framework.package) === null || _b === void 0 ? void 0 : _b.dependencies.filter((value) => extractedDependenciesKeys.includes(value));
        if (matchedDependencies === null || matchedDependencies === void 0 ? void 0 : matchedDependencies.length) {
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
async function inspectByConfigurationFileIfExists(framework, root, fileUrl) {
    // some SSG/SSR frameworks are built on top of other frameworks (Angular, Vue, React, etc).
    // So in order to avoid false positives, we need to check if the framework has a specific config file before we move on.
    // if so, we need to check if the file exists,
    // and if it does, we need to extract (or infer) the correct configuration.
    var _a, _b;
    const hasConfigFile = hasConfigurationFiles(framework, fileUrl);
    if (!hasConfigFile) {
        return null;
    }
    const outputPath = await evaluateOutputLocation(framework, root);
    if (outputPath === null) {
        return null;
    }
    // Read the file content and search for occurrences of dependencies from the framework definition.
    if ((_a = framework.package) === null || _a === void 0 ? void 0 : _a.dependencies) {
        for (const dependencie of (_b = framework.package) === null || _b === void 0 ? void 0 : _b.dependencies) {
            // Note: if fileUrl is a git tree (or a directory), readFile will return null
            const configurationFileContent = await (0, utils_1.readFile)(fileUrl);
            if (configurationFileContent) {
                if (configurationFileContent.includes(dependencie)) {
                    return getMatchedFrameworkObject(root, framework, fileUrl);
                }
            }
            else {
                if (fileUrl.includes("tree") && hasConfigFile) {
                    return getMatchedFrameworkObject(root, framework, fileUrl);
                }
            }
        }
    }
    // if no dependencies are defined, we assume that the framework defintion does not require any dependencies for a match.
    return hasConfigFile ? getMatchedFrameworkObject(root, framework, fileUrl) : null;
}
async function inspectByIndexHtml(framework, root, filename) {
    const isStaticDefintion = framework.id === "static";
    if (!isStaticDefintion) {
        return null;
    }
    for (const indexHtmlFile of framework === null || framework === void 0 ? void 0 : framework.configFiles) {
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
function hasConfigurationFiles(framework, filename) {
    if (!framework.configFiles)
        return false;
    let matchedFiles = 0;
    for (const configFile of framework.configFiles) {
        if (configFile.includes("*")) {
            // we have a wildcard (glob), convert it to a valid regex
            const regex = configFile
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
        }
        else if (filename === null || filename === void 0 ? void 0 : filename.endsWith(configFile)) {
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
async function evaluateOutputLocation(framework, root) {
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
    const jsonFileToParsePath = utils_1.path.join(root, jsonFileToParse.trim());
    const jsonContentRaw = await (0, utils_1.readFile)(jsonFileToParsePath);
    if (jsonContentRaw) {
        if ((0, utils_1.isValidJson)(jsonContentRaw)) {
            const jsonContent = (0, utils_1.safeParseJson)(jsonContentRaw);
            const outputLocation = (await (0, utils_1.jmespathSearch)(jsonContent, jmespathExpression.trim())) || "./";
            return outputLocation;
        }
        console.warn(`[${framework.name}] Could not parse JSON file: ${jsonFileToParsePath}`);
    }
    return "./";
}
function insertOrUpdateMatchedFramwork(matchedFramework, matchedFrameworks) {
    // if matchedFramework in already in the list, merge the matchedFiles
    const existingFramework = matchedFrameworks.find((value) => value.framework.id === matchedFramework.framework.id);
    if (existingFramework) {
        existingFramework.matchedFiles = [...new Set([...existingFramework.matchedFiles, ...matchedFramework.matchedFiles])];
    }
    else {
        matchedFrameworks.push(matchedFramework);
    }
    return matchedFrameworks;
}
async function getMatchedFrameworkObject(projectRootUrl, framework, filepath) {
    const fileUrl = (0, utils_1.getUrlFromFilepath)(filepath);
    const appLocation = (0, utils_1.getApplocationUrl)(filepath);
    const { repo, owner } = (0, utils_1.getRepoInfoFromUrl)(projectRootUrl);
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
//# sourceMappingURL=detectors.js.map