"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseJson = exports.isValidJson = exports.loadFrameworksDefinitions = exports.traverseFolder = exports.fileExists = exports.readFile = exports.jmespathSearch = exports.path = exports.fs = exports.fetchGitHubProjectTrees = exports.getRepoInfoFromUrl = exports.updateGitHubProjectBlobEntryInCache = exports.setGithubDataInCache = exports.getGithubProjectDataFromCache = exports.callGitHubApi = exports.normalizeUrl = exports.getUrlFromFilepath = exports.getApplocationUrl = exports.loadProjectFiles = void 0;
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
const jmespath_1 = require("jmespath");
const FRAMEWORK_DEFINTIONS = __importStar(require("./data/frameworks.json"));
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
exports.loadProjectFiles = loadProjectFiles;
function getApplocationUrl(filepath) {
    filepath = getUrlFromFilepath(filepath);
    if (filepath.startsWith("http")) {
        const project = getGithubProjectDataFromCache();
        if (project) {
            const { branch, url } = project.$$repo;
            return exports.path.dirname(filepath.replace(url, "").replace(`/blob/${branch}/`, "/"));
        }
        return filepath;
    }
    return exports.path.dirname(filepath);
}
exports.getApplocationUrl = getApplocationUrl;
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
exports.getUrlFromFilepath = getUrlFromFilepath;
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
exports.normalizeUrl = normalizeUrl;
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
exports.callGitHubApi = callGitHubApi;
function getGithubProjectDataFromCache() {
    return window.__GITHUB_PROJECT__;
}
exports.getGithubProjectDataFromCache = getGithubProjectDataFromCache;
function setGithubDataInCache(data) {
    window.__GITHUB_PROJECT__ = data;
}
exports.setGithubDataInCache = setGithubDataInCache;
function updateGitHubProjectBlobEntryInCache(file) {
    var _d;
    const data = getGithubProjectDataFromCache();
    (_d = data === null || data === void 0 ? void 0 : data.tree) === null || _d === void 0 ? void 0 : _d.filter((entry) => entry.url === file.url).map((entry) => {
        entry.$$blob = file;
        return entry;
    });
    setGithubDataInCache(data);
}
exports.updateGitHubProjectBlobEntryInCache = updateGitHubProjectBlobEntryInCache;
function getRepoInfoFromUrl(projectUrl) {
    const [_a, _b, _c, repo, owner] = projectUrl.split("/");
    return { repo, owner };
}
exports.getRepoInfoFromUrl = getRepoInfoFromUrl;
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
exports.fetchGitHubProjectTrees = fetchGitHubProjectTrees;
exports.fs = {
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
exports.path = {
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
    return (0, jmespath_1.search)(data, expression);
}
exports.jmespathSearch = jmespathSearch;
async function readFile(filePath) {
    filePath = normalizeUrl(filePath);
    if (fileExists(filePath)) {
        return exports.fs.readFileSync(filePath);
    }
    return null;
}
exports.readFile = readFile;
function fileExists(filePath) {
    try {
        return exports.fs.existsSync(filePath);
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
/**
 * A utility function to recursively traverse a folder and returns its entries.
 * @param folder The folder to traverse.
 * @returns A Generator object that yields entry paths.
 * @example
 * ```
 * for await (const file of traverseFolder(folder)) {
 *    console.log(file);
 * }
 * ```
 */
async function* traverseFolder(folder) {
    const folders = (await exports.fs.readdir(folder, { withFileTypes: true }));
    for (const folderEntry of folders) {
        if (folderEntry.name.startsWith(".")) {
            // WARNING: ignore config folders (those that starts with a dot)!
            continue;
        }
        else if (folderEntry.name.includes("node_modules")) {
            // WARNING: ignore node_modules to avoid perf hits!
            continue;
        }
        const entryPath = exports.path.resolve(folder, folderEntry.name);
        if (folderEntry.isDirectory()) {
            yield* traverseFolder(entryPath);
        }
        else {
            yield entryPath;
        }
    }
}
exports.traverseFolder = traverseFolder;
function loadFrameworksDefinitions() {
    return FRAMEWORK_DEFINTIONS;
}
exports.loadFrameworksDefinitions = loadFrameworksDefinitions;
function isValidJson(jsonContent) {
    if (jsonContent === null) {
        return false;
    }
    jsonContent = (0, strip_json_comments_1.default)(jsonContent);
    try {
        JSON.parse(jsonContent);
        return true;
    }
    catch {
        return false;
    }
}
exports.isValidJson = isValidJson;
function safeParseJson(jsonContent) {
    jsonContent = (0, strip_json_comments_1.default)(jsonContent);
    return JSON.parse(jsonContent);
}
exports.safeParseJson = safeParseJson;
//# sourceMappingURL=utils.js.map