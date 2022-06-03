"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseJson = exports.isValidJson = exports.loadFrameworksDefinitions = exports.traverseFolder = exports.fileExists = exports.readFile = exports.jmespathSearch = exports.path = exports.fs = exports.fetchGitHubProjectTrees = exports.getRepoInfoFromUrl = exports.updateGitHubProjectBlobEntryInCache = exports.setGithubDataInCache = exports.getGithubProjectDataFromCache = exports.callGitHubApi = exports.normalizeUrl = exports.getUrlFromFilepath = exports.getApplocationUrl = exports.loadProjectFiles = void 0;
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
const { search } = require("jmespath");
const FRAMEWORK_DEFINTIONS = require("./data/frameworks.json");
/**
 * Loads a list of files from a dictionary or a GitHub tree.
 * @param root The root directory to load from (or a GitHub project URL).
 *        If a GitHub project URL is provided, it must be of the form:
 *        https://github.com/owner/repo#branch
 * @returns A list of files URLs.
 */
function loadProjectFiles(root) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchGitHubProjectTrees(root);
    });
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
    let [repoUrl, branch = "main"] = url.split("#");
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
function callGitHubApi(url, isRecursive = true) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let response = yield fetch(url, options);
        return [response, (yield response.json())];
    });
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
function fetchGitHubProjectTrees(projectUrl) {
    var _d;
    return __awaiter(this, void 0, void 0, function* () {
        const repoUrl = normalizeUrl(projectUrl);
        const [url, branch = "main"] = projectUrl.split("#");
        // try fist with the provided branch, or use the default one (main)
        let [response, json] = yield callGitHubApi(repoUrl);
        // there is a case where the API returns a 404 if the main branch is not available
        // let's try one more time using legacy master branch
        if (response.status === 404) {
            [response, json] = yield callGitHubApi(repoUrl.replace(`/${branch}`, "/master"));
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
    });
}
exports.fetchGitHubProjectTrees = fetchGitHubProjectTrees;
exports.fs = {
    readdir(path, _options) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    },
    readFileSync(url) {
        var _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            if (url.includes("/git/trees/")) {
                return null;
            }
            const project = getGithubProjectDataFromCache();
            const file = (_d = project === null || project === void 0 ? void 0 : project.tree) === null || _d === void 0 ? void 0 : _d.find((entry) => entry.url.endsWith(url));
            if ((_e = file === null || file === void 0 ? void 0 : file.$$blob) === null || _e === void 0 ? void 0 : _e.$$content) {
                return (_f = file.$$blob) === null || _f === void 0 ? void 0 : _f.$$content;
            }
            // file content is not in cache, fetch it from GitHub
            let [_, entry] = yield callGitHubApi(url);
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
        });
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
function jmespathSearch(data, expression) {
    return __awaiter(this, void 0, void 0, function* () {
        return search(data, expression);
    });
}
exports.jmespathSearch = jmespathSearch;
function readFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        filePath = normalizeUrl(filePath);
        if (fileExists(filePath)) {
            return exports.fs.readFileSync(filePath);
        }
        return null;
    });
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
function traverseFolder(folder) {
    return __asyncGenerator(this, arguments, function* traverseFolder_1() {
        const folders = (yield __await(exports.fs.readdir(folder, { withFileTypes: true })));
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
                yield __await(yield* __asyncDelegator(__asyncValues(traverseFolder(entryPath))));
            }
            else {
                yield yield __await(entryPath);
            }
        }
    });
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
    catch (_d) {
        return false;
    }
}
exports.isValidJson = isValidJson;
function safeParseJson(jsonContent) {
    jsonContent = (0, strip_json_comments_1.default)(jsonContent);
    return JSON.parse(jsonContent);
}
exports.safeParseJson = safeParseJson;
