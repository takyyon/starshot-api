var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import stripJsonComments from "strip-json-comments";
var search = require("jmespath").search;
var FRAMEWORK_DEFINTIONS = require("./data/frameworks.json");
/**
 * Loads a list of files from a dictionary or a GitHub tree.
 * @param root The root directory to load from (or a GitHub project URL).
 *        If a GitHub project URL is provided, it must be of the form:
 *        https://github.com/owner/repo#branch
 * @returns A list of files URLs.
 */
export function loadProjectFiles(root) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, fetchGitHubProjectTrees(root)];
                case 1: return [2 /*return*/, _d.sent()];
            }
        });
    });
}
export function getApplocationUrl(filepath) {
    filepath = getUrlFromFilepath(filepath);
    if (filepath.startsWith("http")) {
        var project = getGithubProjectDataFromCache();
        if (project) {
            var _d = project.$$repo, branch = _d.branch, url = _d.url;
            return path.dirname(filepath.replace(url, "").replace("/blob/".concat(branch, "/"), "/"));
        }
        return filepath;
    }
    return path.dirname(filepath);
}
export function getUrlFromFilepath(filepath) {
    if (filepath.startsWith("http")) {
        var project = getGithubProjectDataFromCache();
        if (project) {
            // find the file in the project
            var file = project.tree.find(function (f) { return f.url === filepath; });
            if (file) {
                // https://github.com/owner/repo/blob/<branch>/<filepath>
                var _d = project.$$repo, url = _d.url, branch = _d.branch;
                return "".concat(url, "/blob/").concat(branch, "/").concat(file.path);
            }
        }
    }
    return filepath;
}
export function normalizeUrl(url, defaultBranch) {
    var _d, _e;
    if (defaultBranch === void 0) { defaultBranch = "main"; }
    var _f = url.split("#"), repoUrl = _f[0], _g = _f[1], branch = _g === void 0 ? "main" : _g;
    var normalizedUrl = repoUrl;
    if (url.startsWith("https://github.com")) {
        // convert HTTP URL to API URL
        // from: https://github.com/owner/repo#branch
        // to: https://api.github.com/repos/owner/repo/git/trees/branch
        normalizedUrl = url.replace("https://github.com", "https://api.github.com/repos") + "/git/trees/".concat(branch || defaultBranch);
    }
    else {
        // convert relative URL to absolute blob URL (from cache)
        // from: package.json
        // to: https://api.github.com/repos/owner/repo/git/blobs/sha
        var project = getGithubProjectDataFromCache();
        var blobUrl = (_e = (_d = project === null || project === void 0 ? void 0 : project.tree) === null || _d === void 0 ? void 0 : _d.find(function (entry) { return entry.path === url; })) === null || _e === void 0 ? void 0 : _e.url;
        normalizedUrl = blobUrl !== null && blobUrl !== void 0 ? blobUrl : url;
    }
    return normalizedUrl;
}
export function callGitHubApi(url, isRecursive) {
    if (isRecursive === void 0) { isRecursive = true; }
    return __awaiter(this, void 0, void 0, function () {
        var options, response, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (url.startsWith("https://api.github.com") === false) {
                        throw new Error("Invalid GitHub URL: ".concat(url || "null"));
                    }
                    options = {
                        headers: {
                            Accept: "application/vnd.github.v3+json",
                            Authorization: "Basic " + window.btoa("manekinekko:GITHUB_TOKEN")
                        }
                    };
                    if (isRecursive) {
                        url = "".concat(url, "?recursive=").concat(isRecursive);
                    }
                    return [4 /*yield*/, fetch(url, options)];
                case 1:
                    response = _e.sent();
                    _d = [response];
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _d.concat([(_e.sent())])];
            }
        });
    });
}
export function getGithubProjectDataFromCache() {
    return window.__GITHUB_PROJECT__;
}
export function setGithubDataInCache(data) {
    window.__GITHUB_PROJECT__ = data;
}
export function updateGitHubProjectBlobEntryInCache(file) {
    var _d;
    var data = getGithubProjectDataFromCache();
    (_d = data === null || data === void 0 ? void 0 : data.tree) === null || _d === void 0 ? void 0 : _d.filter(function (entry) { return entry.url === file.url; }).map(function (entry) {
        entry.$$blob = file;
        return entry;
    });
    setGithubDataInCache(data);
}
export function getRepoInfoFromUrl(projectUrl) {
    var _d = projectUrl.split("/"), _a = _d[0], _b = _d[1], _c = _d[2], repo = _d[3], owner = _d[4];
    return { repo: repo, owner: owner };
}
/**
 * Fetches a GitHub project tree.
 * @param projectUrl The HTTP URL of the GitHub repository.
 *            The project URL must be of the form: https://github.com/owner/repo#branch
 * @returns An array of files URLs
 */
export function fetchGitHubProjectTrees(projectUrl) {
    var _d;
    return __awaiter(this, void 0, void 0, function () {
        var repoUrl, _e, url, _f, branch, _g, response, json, files;
        var _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    repoUrl = normalizeUrl(projectUrl);
                    _e = projectUrl.split("#"), url = _e[0], _f = _e[1], branch = _f === void 0 ? "main" : _f;
                    return [4 /*yield*/, callGitHubApi(repoUrl)];
                case 1:
                    _g = _j.sent(), response = _g[0], json = _g[1];
                    if (!(response.status === 404)) return [3 /*break*/, 3];
                    return [4 /*yield*/, callGitHubApi(repoUrl.replace("/".concat(branch), "/master"))];
                case 2:
                    _h = _j.sent(), response = _h[0], json = _h[1];
                    _j.label = 3;
                case 3:
                    if (json) {
                        json.$$repo = {
                            url: url,
                            branch: branch
                        };
                        if ((_d = json.tree) === null || _d === void 0 ? void 0 : _d.length) {
                            files = json.tree.map(function (entry) {
                                // mock fs.Dirent interface
                                entry.isDirectory = function () { return entry.url.includes("tree"); };
                                entry.name = entry.path;
                                return entry.path;
                            });
                            setGithubDataInCache(json);
                            return [2 /*return*/, files];
                        }
                    }
                    return [2 /*return*/, []];
            }
        });
    });
}
export var fs = {
    readdir: function (path, _options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                return [2 /*return*/, []];
            });
        });
    },
    readFileSync: function (url) {
        var _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var project, file, _g, _, entry;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (url.includes("/git/trees/")) {
                            return [2 /*return*/, null];
                        }
                        project = getGithubProjectDataFromCache();
                        file = (_d = project === null || project === void 0 ? void 0 : project.tree) === null || _d === void 0 ? void 0 : _d.find(function (entry) { return entry.url.endsWith(url); });
                        if ((_e = file === null || file === void 0 ? void 0 : file.$$blob) === null || _e === void 0 ? void 0 : _e.$$content) {
                            return [2 /*return*/, (_f = file.$$blob) === null || _f === void 0 ? void 0 : _f.$$content];
                        }
                        return [4 /*yield*/, callGitHubApi(url)];
                    case 1:
                        _g = _h.sent(), _ = _g[0], entry = _g[1];
                        if (entry === null || entry === void 0 ? void 0 : entry.content) {
                            // NOTE: sometimes the base64 content contains multiple "\n" !!!
                            // we need to remove them, otherwise decoding will fail
                            entry.content = entry.content.replace(/\n/g, "\r\n");
                            // cache the decoded content
                            entry.$$content = window.atob(entry.content);
                            updateGitHubProjectBlobEntryInCache(entry);
                            return [2 /*return*/, entry.$$content];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    },
    existsSync: function (path) {
        var _d;
        var data = getGithubProjectDataFromCache();
        return (_d = data === null || data === void 0 ? void 0 : data.tree) === null || _d === void 0 ? void 0 : _d.some(function (entry) { return entry.path.endsWith(path) || entry.url.endsWith(path); });
    }
};
export var path = {
    join: function () {
        var _d, _e, _f;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // File entries got from the GitHub API have unique URLs, for each file entry. Get that URL from the cache
        var fileUrl = (_d = args.pop()) !== null && _d !== void 0 ? _d : "";
        var githubEntries = getGithubProjectDataFromCache();
        var entry = (_e = githubEntries === null || githubEntries === void 0 ? void 0 : githubEntries.tree) === null || _e === void 0 ? void 0 : _e.find(function (entry) { return entry.path.endsWith(fileUrl); });
        return (_f = entry === null || entry === void 0 ? void 0 : entry.url) !== null && _f !== void 0 ? _f : fileUrl;
    },
    resolve: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.join("/");
    },
    basename: function (args) {
        return args.split("/").pop();
    },
    dirname: function (filepath) {
        return filepath.split("/").slice(0, -1).join("/");
    }
};
export function jmespathSearch(data, expression) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            return [2 /*return*/, search(data, expression)];
        });
    });
}
export function readFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            filePath = normalizeUrl(filePath);
            if (fileExists(filePath)) {
                return [2 /*return*/, fs.readFileSync(filePath)];
            }
            return [2 /*return*/, null];
        });
    });
}
export function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    }
    catch (err) {
        return false;
    }
}
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
export function traverseFolder(folder) {
    return __asyncGenerator(this, arguments, function traverseFolder_1() {
        var folders, _i, folders_1, folderEntry, entryPath;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, __await(fs.readdir(folder, { withFileTypes: true }))];
                case 1:
                    folders = (_d.sent());
                    _i = 0, folders_1 = folders;
                    _d.label = 2;
                case 2:
                    if (!(_i < folders_1.length)) return [3 /*break*/, 9];
                    folderEntry = folders_1[_i];
                    if (folderEntry.name.startsWith(".")) {
                        // WARNING: ignore config folders (those that starts with a dot)!
                        return [3 /*break*/, 8];
                    }
                    else if (folderEntry.name.includes("node_modules")) {
                        // WARNING: ignore node_modules to avoid perf hits!
                        return [3 /*break*/, 8];
                    }
                    entryPath = path.resolve(folder, folderEntry.name);
                    if (!folderEntry.isDirectory()) return [3 /*break*/, 5];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(traverseFolder(entryPath))))];
                case 3: return [4 /*yield*/, __await.apply(void 0, [_d.sent()])];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, __await(entryPath)];
                case 6: return [4 /*yield*/, _d.sent()];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
export function loadFrameworksDefinitions() {
    return FRAMEWORK_DEFINTIONS;
}
export function isValidJson(jsonContent) {
    if (jsonContent === null) {
        return false;
    }
    jsonContent = stripJsonComments(jsonContent);
    try {
        JSON.parse(jsonContent);
        return true;
    }
    catch (_d) {
        return false;
    }
}
export function safeParseJson(jsonContent) {
    jsonContent = stripJsonComments(jsonContent);
    return JSON.parse(jsonContent);
}
