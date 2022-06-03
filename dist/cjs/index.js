'use strict';

const singleComment = Symbol('singleComment');
const multiComment = Symbol('multiComment');

const stripWithoutWhitespace = () => '';
const stripWithWhitespace = (string, start, end) => string.slice(start, end).replace(/\S/g, ' ');

const isEscaped = (jsonString, quotePosition) => {
	let index = quotePosition - 1;
	let backslashCount = 0;

	while (jsonString[index] === '\\') {
		index -= 1;
		backslashCount += 1;
	}

	return Boolean(backslashCount % 2);
};

function stripJsonComments(jsonString, {whitespace = true} = {}) {
	if (typeof jsonString !== 'string') {
		throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof jsonString}\``);
	}

	const strip = whitespace ? stripWithWhitespace : stripWithoutWhitespace;

	let isInsideString = false;
	let isInsideComment = false;
	let offset = 0;
	let result = '';

	for (let index = 0; index < jsonString.length; index++) {
		const currentCharacter = jsonString[index];
		const nextCharacter = jsonString[index + 1];

		if (!isInsideComment && currentCharacter === '"') {
			const escaped = isEscaped(jsonString, index);
			if (!escaped) {
				isInsideString = !isInsideString;
			}
		}

		if (isInsideString) {
			continue;
		}

		if (!isInsideComment && currentCharacter + nextCharacter === '//') {
			result += jsonString.slice(offset, index);
			offset = index;
			isInsideComment = singleComment;
			index++;
		} else if (isInsideComment === singleComment && currentCharacter + nextCharacter === '\r\n') {
			index++;
			isInsideComment = false;
			result += strip(jsonString, offset, index);
			offset = index;
			continue;
		} else if (isInsideComment === singleComment && currentCharacter === '\n') {
			isInsideComment = false;
			result += strip(jsonString, offset, index);
			offset = index;
		} else if (!isInsideComment && currentCharacter + nextCharacter === '/*') {
			result += jsonString.slice(offset, index);
			offset = index;
			isInsideComment = multiComment;
			index++;
			continue;
		} else if (isInsideComment === multiComment && currentCharacter + nextCharacter === '*/') {
			index++;
			isInsideComment = false;
			result += strip(jsonString, offset, index + 1);
			offset = index + 1;
			continue;
		}
	}

	return result + (isInsideComment ? strip(jsonString.slice(offset)) : jsonString.slice(offset));
}

var frameworks = [{id:"nodejs",name:"Node.js",outputLocation:"api",configFiles:["package.json"]},{id:"dotnet",name:".NET",outputLocation:"api",configFiles:["*.csproj","*.fsproj","global.json"]},{id:"python",name:"Python",outputLocation:"api",variant:["django"],configFiles:["requirements.txt","pyproject.toml","runtime.txt","setup.py"]},{id:"django",name:"Django",outputLocation:"api",configFiles:["manage.py","wsgi.py","app.py"]},{id:"static",name:"Static",outputLocation:"./",configFiles:["index.html","Index.html","default.htm","default.html","index.htm"]},{id:"angular",name:"Angular",variant:["angular-universal","scully","ionic-angular"],"package":{dependencies:["@angular/core"]},outputLocation:"{angular.json#values(projects)[0].architect.build.options.outputPath}",configFiles:["angular.json"]},{id:"angular-universal",name:"Angular Universal","package":{dependencies:["@angular/platform-server"]},outputLocation:"{angular.json#values(projects)[0].architect.build.options.outputPath}",configFiles:["angular.json","tsconfig.server.json"]},{id:"ionic-angular",name:"Ionic for Angular","package":{dependencies:["@ionic/angular"]},outputLocation:"{angular.json#values(projects)[0].architect.build.options.outputPath}",configFiles:["ionic.config.json","angular.json"]},{id:"scully",name:"Scully","package":{dependencies:["@scullyio/scully","@scullyio/init"]},outputLocation:"{angular.json#values(projects)[0].architect.build.options.outputPath}",configFiles:["angular.json","scully.*.config.ts"]},{id:"react",name:"React",variant:["preact","nextjs","gatsby","ionic-react"],"package":{dependencies:["react","react-dom"]},outputLocation:"build"},{id:"preact",name:"Preact","package":{dependencies:["preact"]},outputLocation:"build"},{id:"nextjs",name:"Next.js","package":{dependencies:["next"]},outputLocation:"out"},{id:"gatsby",name:"Gatsby","package":{dependencies:["gatsby"]},outputLocation:"public",configFiles:["gatsby-config.js"]},{id:"ionic-react",name:"Ionic for React","package":{dependencies:["@ionic/react"]},outputLocation:"build"},{id:"vue",name:"Vue.js",variant:["nuxtjs","vuepress"],"package":{dependencies:["vue"]},outputLocation:"dist",configFiles:["vue.config.js"]},{id:"nuxtjs",name:"Nuxt.js","package":{dependencies:["nuxt"]},outputLocation:"dist",configFiles:["nuxt.config.js"]},{id:"vuepress",name:"VuePress","package":{dependencies:["vuepress"]},outputLocation:"dist"},{id:"aurelia",name:"Aurelia","package":{dependencies:["aurelia-bootstrapper"]},outputLocation:"dist"},{id:"elm",name:"Elm","package":{dependencies:["elm","elm-lang"]},outputLocation:"public",configFiles:["elm.json"]},{id:"ember",name:"Ember.js","package":{entryKey:"ember",dependencies:["ember-cli"]},outputLocation:"dist",configFiles:["ember-cli-build.js",".ember-cli"]},{id:"flutter",name:"Flutter","package":{dependencies:["flutter","flutter_test"]},outputLocation:"build/web",configFiles:["pubspec.yaml"]},{id:"glimmer",name:"Glimmer.js","package":{dependencies:["@glimmer/core"]},outputLocation:"dist"},{id:"hugo",name:"Hugo","package":{dependencies:["hugo-cli"]},outputLocation:"public",configFiles:["archetypes","config.toml"]},{id:"knockoutjs",name:"Knockout.js","package":{dependencies:["knockout"]},outputLocation:"dist"},{id:"lit",name:"Lit","package":{dependencies:["lit-element"]},outputLocation:"dist",configFiles:["custom-elements.json"]},{id:"marko",name:"Marko.js","package":{dependencies:["marko"]},outputLocation:"public"},{id:"meteor",name:"Meteor","package":{entryKey:"meteor",dependencies:["meteor-node-stubs"]},outputLocation:"bundle"},{id:"mithril",name:"Mithril.js","package":{dependencies:["mithril"]},outputLocation:"dist"},{id:"polymer",name:"Polymer","package":{dependencies:["@polymer/polymer"]},outputLocation:"build/default",configFiles:["polymer.json"]},{id:"riot",name:"RiotJS","package":{dependencies:["riot"]},outputLocation:"dist"},{id:"stencil",name:"Stencil.js","package":{dependencies:["@stencil/core"]},outputLocation:"www",configFiles:["stencil.config.ts"]},{id:"svelte",name:"Svelte","package":{dependencies:["svelte"]},outputLocation:"public"},{id:"typescript",name:"TypeScript","package":{dependencies:["typescript"]},outputLocation:"{tsconfig.json#compilerOptions.outDir}",configFiles:["tsconfig.json"]}];

var FRAMEWORK_DEFINTIONS = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': frameworks
});

const { search } = require("jmespath");
/**
 * Loads a list of files from a dictionary or a GitHub tree.
 * @param root The root directory to load from (or a GitHub project URL).
 *        If a GitHub project URL is provided, it must be of the form:
 *        https://github.com/owner/repo#branch
 * @returns A list of files URLs.
 */
async function loadProjectFiles(root) {
    return await fetchGitHubProjectTrees(root);
}
function getApplocationUrl(filepath) {
    filepath = getUrlFromFilepath(filepath);
    if (filepath.startsWith("http")) {
        const project = getGithubProjectDataFromCache();
        if (project) {
            const { branch, url } = project.$$repo;
            return path.dirname(filepath.replace(url, "").replace(`/blob/${branch}/`, "/"));
        }
        return filepath;
    }
    return path.dirname(filepath);
}
function getUrlFromFilepath(filepath) {
    if (filepath.startsWith("http")) {
        const project = getGithubProjectDataFromCache();
        if (project) {
            // find the file in the project
            const file = project.tree.find((f) => f.url === filepath);
            if (file) {
                // https://github.com/owner/repo/blob/<branch>/<filepath>
                const { url, branch } = project.$$repo;
                return `${url}/blob/${branch}/${file.path}`;
            }
        }
    }
    return filepath;
}
function normalizeUrl(url, defaultBranch = "main") {
    var _d, _e;
    const [repoUrl, branch = "main"] = url.split("#");
    let normalizedUrl = repoUrl;
    if (url.startsWith("https://github.com")) {
        // convert HTTP URL to API URL
        // from: https://github.com/owner/repo#branch
        // to: https://api.github.com/repos/owner/repo/git/trees/branch
        normalizedUrl = url.replace("https://github.com", "https://api.github.com/repos") + `/git/trees/${branch || defaultBranch}`;
    }
    else {
        // convert relative URL to absolute blob URL (from cache)
        // from: package.json
        // to: https://api.github.com/repos/owner/repo/git/blobs/sha
        const project = getGithubProjectDataFromCache();
        const blobUrl = (_e = (_d = project === null || project === void 0 ? void 0 : project.tree) === null || _d === void 0 ? void 0 : _d.find((entry) => entry.path === url)) === null || _e === void 0 ? void 0 : _e.url;
        normalizedUrl = blobUrl !== null && blobUrl !== void 0 ? blobUrl : url;
    }
    return normalizedUrl;
}
async function callGitHubApi(url, isRecursive = true) {
    if (url.startsWith("https://api.github.com") === false) {
        throw new Error(`Invalid GitHub URL: ${url || "null"}`);
    }
    const options = {
        headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: "Basic " + window.btoa("manekinekko:GITHUB_TOKEN"),
        },
    };
    if (isRecursive) {
        url = `${url}?recursive=${isRecursive}`;
    }
    const response = await fetch(url, options);
    return [response, (await response.json())];
}
function getGithubProjectDataFromCache() {
    return window.__GITHUB_PROJECT__;
}
function setGithubDataInCache(data) {
    window.__GITHUB_PROJECT__ = data;
}
function updateGitHubProjectBlobEntryInCache(file) {
    var _d;
    const data = getGithubProjectDataFromCache();
    (_d = data === null || data === void 0 ? void 0 : data.tree) === null || _d === void 0 ? void 0 : _d.filter((entry) => entry.url === file.url).map((entry) => {
        entry.$$blob = file;
        return entry;
    });
    setGithubDataInCache(data);
}
function getRepoInfoFromUrl(projectUrl) {
    const [_a, _b, _c, repo, owner] = projectUrl.split("/");
    return { repo, owner };
}
/**
 * Fetches a GitHub project tree.
 * @param projectUrl The HTTP URL of the GitHub repository.
 *            The project URL must be of the form: https://github.com/owner/repo#branch
 * @returns An array of files URLs
 */
async function fetchGitHubProjectTrees(projectUrl) {
    var _d;
    const repoUrl = normalizeUrl(projectUrl);
    const [url, branch = "main"] = projectUrl.split("#");
    // try fist with the provided branch, or use the default one (main)
    let [response, json] = await callGitHubApi(repoUrl);
    // there is a case where the API returns a 404 if the main branch is not available
    // let's try one more time using legacy master branch
    if (response.status === 404) {
        [response, json] = await callGitHubApi(repoUrl.replace(`/${branch}`, "/master"));
    }
    if (json) {
        json.$$repo = {
            url,
            branch,
        };
        if ((_d = json.tree) === null || _d === void 0 ? void 0 : _d.length) {
            const files = json.tree.map((entry) => {
                // mock fs.Dirent interface
                entry.isDirectory = () => entry.url.includes("tree");
                entry.name = entry.path;
                return entry.path;
            });
            setGithubDataInCache(json);
            return files;
        }
    }
    return [];
}
const fs = {
    async readdir(_, _options) {
        return [];
    },
    async readFileSync(url) {
        var _d, _e, _f;
        if (url.includes("/git/trees/")) {
            return null;
        }
        const project = getGithubProjectDataFromCache();
        const file = (_d = project === null || project === void 0 ? void 0 : project.tree) === null || _d === void 0 ? void 0 : _d.find((entry) => entry.url.endsWith(url));
        if ((_e = file === null || file === void 0 ? void 0 : file.$$blob) === null || _e === void 0 ? void 0 : _e.$$content) {
            return (_f = file.$$blob) === null || _f === void 0 ? void 0 : _f.$$content;
        }
        // file content is not in cache, fetch it from GitHub
        const [_, entry] = await callGitHubApi(url);
        if (entry === null || entry === void 0 ? void 0 : entry.content) {
            // NOTE: sometimes the base64 content contains multiple "\n" !!!
            // we need to remove them, otherwise decoding will fail
            entry.content = entry.content.replace(/\n/g, "\r\n");
            // cache the decoded content
            entry.$$content = window.atob(entry.content);
            updateGitHubProjectBlobEntryInCache(entry);
            return entry.$$content;
        }
        return null;
    },
    existsSync(path) {
        var _d;
        const data = getGithubProjectDataFromCache();
        return (_d = data === null || data === void 0 ? void 0 : data.tree) === null || _d === void 0 ? void 0 : _d.some((entry) => entry.path.endsWith(path) || entry.url.endsWith(path));
    },
};
const path = {
    join(...args) {
        var _d, _e, _f;
        // File entries got from the GitHub API have unique URLs, for each file entry. Get that URL from the cache
        const fileUrl = (_d = args.pop()) !== null && _d !== void 0 ? _d : "";
        const githubEntries = getGithubProjectDataFromCache();
        const entry = (_e = githubEntries === null || githubEntries === void 0 ? void 0 : githubEntries.tree) === null || _e === void 0 ? void 0 : _e.find((entry) => entry.path.endsWith(fileUrl));
        return (_f = entry === null || entry === void 0 ? void 0 : entry.url) !== null && _f !== void 0 ? _f : fileUrl;
    },
    resolve(...args) {
        return args.join("/");
    },
    basename(args) {
        return args.split("/").pop();
    },
    dirname: (filepath) => {
        return filepath.split("/").slice(0, -1).join("/");
    },
};
async function jmespathSearch(data, expression) {
    return search(data, expression);
}
async function readFile(filePath) {
    filePath = normalizeUrl(filePath);
    if (fileExists(filePath)) {
        return fs.readFileSync(filePath);
    }
    return null;
}
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    }
    catch (err) {
        return false;
    }
}
function loadFrameworksDefinitions() {
    return FRAMEWORK_DEFINTIONS;
}
function isValidJson(jsonContent) {
    if (jsonContent === null) {
        return false;
    }
    jsonContent = stripJsonComments(jsonContent);
    try {
        JSON.parse(jsonContent);
        return true;
    }
    catch {
        return false;
    }
}
function safeParseJson(jsonContent) {
    jsonContent = stripJsonComments(jsonContent);
    return JSON.parse(jsonContent);
}

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
        framewokDefinitions = loadFrameworksDefinitions();
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
function isPackageJsonFile(filepath) {
    return (
    // make sure the file is a package.json file
    filepath.endsWith(PACKAGE_JSON_FILENAME) &&
        // make sure the file exists
        fileExists(filepath));
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
    const jsonContentRaw = await readFile(fileUrl);
    if (isValidJson(jsonContentRaw) === false) {
        console.warn(`[${framework.name}] Could not parse JSON file: ${fileUrl}`);
        return null;
    }
    const packageJson = safeParseJson(jsonContentRaw || "{}");
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
            const configurationFileContent = await readFile(fileUrl);
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

const getFrameworks = (org, repo, branch, githubToken) => {
    console.log(githubToken);
    const projectUrl = `https://github.com/${org}/${repo}${`${branch}? : #${branch}: ''`}`;
    return inspect(projectUrl, [], true);
};

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.get('/', async (req, res) => {
    const repo = req.query.repo;
    const org = req.query.org;
    const branch = req.query.branch;
    const token = req.headers['github-token'];
    if (!org || typeof org !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Org');
    }
    else if (!repo || typeof repo !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Repo');
    }
    else if (typeof branch !== 'string') {
        res.status(400);
        res.render('Invalid parameters: Branch');
    }
    else if (typeof token !== 'string') {
        res.status(400);
        res.render('Invalid header: Github-token');
    }
    else {
        const frameworks = await getFrameworks(org, repo, branch, token);
        res.send(frameworks);
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9zdHJpcC1qc29uLWNvbW1lbnRzL2luZGV4LmpzIiwiLi4vLi4vc3JjL2xpYi91dGlscy50cyIsIi4uLy4uL3NyYy9saWIvZGV0ZWN0b3JzLnRzIiwiLi4vLi4vc3JjL2xpYi9mdW5jdGlvbnMudHMiLCIuLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2luZ2xlQ29tbWVudCA9IFN5bWJvbCgnc2luZ2xlQ29tbWVudCcpO1xuY29uc3QgbXVsdGlDb21tZW50ID0gU3ltYm9sKCdtdWx0aUNvbW1lbnQnKTtcblxuY29uc3Qgc3RyaXBXaXRob3V0V2hpdGVzcGFjZSA9ICgpID0+ICcnO1xuY29uc3Qgc3RyaXBXaXRoV2hpdGVzcGFjZSA9IChzdHJpbmcsIHN0YXJ0LCBlbmQpID0+IHN0cmluZy5zbGljZShzdGFydCwgZW5kKS5yZXBsYWNlKC9cXFMvZywgJyAnKTtcblxuY29uc3QgaXNFc2NhcGVkID0gKGpzb25TdHJpbmcsIHF1b3RlUG9zaXRpb24pID0+IHtcblx0bGV0IGluZGV4ID0gcXVvdGVQb3NpdGlvbiAtIDE7XG5cdGxldCBiYWNrc2xhc2hDb3VudCA9IDA7XG5cblx0d2hpbGUgKGpzb25TdHJpbmdbaW5kZXhdID09PSAnXFxcXCcpIHtcblx0XHRpbmRleCAtPSAxO1xuXHRcdGJhY2tzbGFzaENvdW50ICs9IDE7XG5cdH1cblxuXHRyZXR1cm4gQm9vbGVhbihiYWNrc2xhc2hDb3VudCAlIDIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBKc29uQ29tbWVudHMoanNvblN0cmluZywge3doaXRlc3BhY2UgPSB0cnVlfSA9IHt9KSB7XG5cdGlmICh0eXBlb2YganNvblN0cmluZyAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhcmd1bWVudCBcXGBqc29uU3RyaW5nXFxgIHRvIGJlIGEgXFxgc3RyaW5nXFxgLCBnb3QgXFxgJHt0eXBlb2YganNvblN0cmluZ31cXGBgKTtcblx0fVxuXG5cdGNvbnN0IHN0cmlwID0gd2hpdGVzcGFjZSA/IHN0cmlwV2l0aFdoaXRlc3BhY2UgOiBzdHJpcFdpdGhvdXRXaGl0ZXNwYWNlO1xuXG5cdGxldCBpc0luc2lkZVN0cmluZyA9IGZhbHNlO1xuXHRsZXQgaXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XG5cdGxldCBvZmZzZXQgPSAwO1xuXHRsZXQgcmVzdWx0ID0gJyc7XG5cblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGpzb25TdHJpbmcubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3QgY3VycmVudENoYXJhY3RlciA9IGpzb25TdHJpbmdbaW5kZXhdO1xuXHRcdGNvbnN0IG5leHRDaGFyYWN0ZXIgPSBqc29uU3RyaW5nW2luZGV4ICsgMV07XG5cblx0XHRpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyID09PSAnXCInKSB7XG5cdFx0XHRjb25zdCBlc2NhcGVkID0gaXNFc2NhcGVkKGpzb25TdHJpbmcsIGluZGV4KTtcblx0XHRcdGlmICghZXNjYXBlZCkge1xuXHRcdFx0XHRpc0luc2lkZVN0cmluZyA9ICFpc0luc2lkZVN0cmluZztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNJbnNpZGVTdHJpbmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICghaXNJbnNpZGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnLy8nKSB7XG5cdFx0XHRyZXN1bHQgKz0ganNvblN0cmluZy5zbGljZShvZmZzZXQsIGluZGV4KTtcblx0XHRcdG9mZnNldCA9IGluZGV4O1xuXHRcdFx0aXNJbnNpZGVDb21tZW50ID0gc2luZ2xlQ29tbWVudDtcblx0XHRcdGluZGV4Kys7XG5cdFx0fSBlbHNlIGlmIChpc0luc2lkZUNvbW1lbnQgPT09IHNpbmdsZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciArIG5leHRDaGFyYWN0ZXIgPT09ICdcXHJcXG4nKSB7XG5cdFx0XHRpbmRleCsrO1xuXHRcdFx0aXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XG5cdFx0XHRyZXN1bHQgKz0gc3RyaXAoanNvblN0cmluZywgb2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZiAoaXNJbnNpZGVDb21tZW50ID09PSBzaW5nbGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgPT09ICdcXG4nKSB7XG5cdFx0XHRpc0luc2lkZUNvbW1lbnQgPSBmYWxzZTtcblx0XHRcdHJlc3VsdCArPSBzdHJpcChqc29uU3RyaW5nLCBvZmZzZXQsIGluZGV4KTtcblx0XHRcdG9mZnNldCA9IGluZGV4O1xuXHRcdH0gZWxzZSBpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJy8qJykge1xuXHRcdFx0cmVzdWx0ICs9IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IG11bHRpQ29tbWVudDtcblx0XHRcdGluZGV4Kys7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gbXVsdGlDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnKi8nKSB7XG5cdFx0XHRpbmRleCsrO1xuXHRcdFx0aXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XG5cdFx0XHRyZXN1bHQgKz0gc3RyaXAoanNvblN0cmluZywgb2Zmc2V0LCBpbmRleCArIDEpO1xuXHRcdFx0b2Zmc2V0ID0gaW5kZXggKyAxO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdCArIChpc0luc2lkZUNvbW1lbnQgPyBzdHJpcChqc29uU3RyaW5nLnNsaWNlKG9mZnNldCkpIDoganNvblN0cmluZy5zbGljZShvZmZzZXQpKTtcbn1cbiIsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzlDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QztBQUNBLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDeEMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakc7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLFVBQVUsRUFBRSxhQUFhLEtBQUs7QUFDakQsQ0FBQyxJQUFJLEtBQUssR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCO0FBQ0EsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDcEMsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQ2IsRUFBRSxjQUFjLElBQUksQ0FBQyxDQUFDO0FBQ3RCLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQztBQUNGO0FBQ2UsU0FBUyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQ2hGLENBQUMsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDckMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsMkRBQTJELEVBQUUsT0FBTyxVQUFVLENBQUMs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
