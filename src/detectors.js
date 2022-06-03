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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { fileExists, getApplocationUrl, getRepoInfoFromUrl, getUrlFromFilepath, isValidJson, jmespathSearch, loadFrameworksDefinitions, loadProjectFiles, normalizeUrl, path, readFile, safeParseJson, } from "./utils";
var PACKAGE_JSON_FILENAME = "package.json";
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
export function inspect(projectRootUrl, framewokDefinitions, matchAll, projectFiles) {
    var _a;
    if (framewokDefinitions === void 0) { framewokDefinitions = []; }
    if (matchAll === void 0) { matchAll = false; }
    if (projectFiles === void 0) { projectFiles = []; }
    return __awaiter(this, void 0, void 0, function () {
        var foundFrameworks, toIgnoreIfMultipleFrameworksFound, rootPackageJsonPath, hasRootPackageJson, _i, framewokDefinitions_1, framework, _b, projectFiles_1, fileUrl, frameworkMatchByPackageJson, _c, frameworkMatchByConfigurationFiles, _d, frameworkMatchByIndexHtml, _e, _loop_1, _f, _g, variant;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    foundFrameworks = [];
                    toIgnoreIfMultipleFrameworksFound = ["nodejs", "typescript" /* other frameworks with variants will be added later (see below) */];
                    if (framewokDefinitions.length === 0) {
                        framewokDefinitions = loadFrameworksDefinitions();
                    }
                    if (!(projectFiles.length === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, loadProjectFiles(projectRootUrl)];
                case 1:
                    projectFiles = _h.sent();
                    _h.label = 2;
                case 2:
                    rootPackageJsonPath = normalizeUrl(PACKAGE_JSON_FILENAME);
                    hasRootPackageJson = fileExists(rootPackageJsonPath);
                    if (!hasRootPackageJson) {
                        // TODO: some frameworks might not have a package.json file, but must be detected.
                        // TODO: project does not have a root package.json, this could be either:
                        // - a different technology (python, java...)
                        // - a simple folder
                        console.warn("No package.json file found at the root of the project.");
                    }
                    _i = 0, framewokDefinitions_1 = framewokDefinitions;
                    _h.label = 3;
                case 3:
                    if (!(_i < framewokDefinitions_1.length)) return [3 /*break*/, 19];
                    framework = framewokDefinitions_1[_i];
                    _b = 0, projectFiles_1 = projectFiles;
                    _h.label = 4;
                case 4:
                    if (!(_b < projectFiles_1.length)) return [3 /*break*/, 18];
                    fileUrl = projectFiles_1[_b];
                    return [4 /*yield*/, inspectByPackageJSONIfExists(framework, projectRootUrl, fileUrl)];
                case 5:
                    frameworkMatchByPackageJson = _h.sent();
                    if (!frameworkMatchByPackageJson) return [3 /*break*/, 7];
                    _c = insertOrUpdateMatchedFramwork;
                    return [4 /*yield*/, getMatchedFrameworkObject(projectRootUrl, framework, fileUrl)];
                case 6:
                    foundFrameworks = _c.apply(void 0, [_h.sent(), foundFrameworks]);
                    _h.label = 7;
                case 7: return [4 /*yield*/, inspectByConfigurationFileIfExists(framework, projectRootUrl, fileUrl)];
                case 8:
                    frameworkMatchByConfigurationFiles = _h.sent();
                    if (!frameworkMatchByConfigurationFiles) return [3 /*break*/, 10];
                    _d = insertOrUpdateMatchedFramwork;
                    return [4 /*yield*/, getMatchedFrameworkObject(projectRootUrl, framework, fileUrl)];
                case 9:
                    foundFrameworks = _d.apply(void 0, [_h.sent(), foundFrameworks]);
                    _h.label = 10;
                case 10: return [4 /*yield*/, inspectByIndexHtml(framework, projectRootUrl, fileUrl)];
                case 11:
                    frameworkMatchByIndexHtml = _h.sent();
                    if (!frameworkMatchByIndexHtml) return [3 /*break*/, 13];
                    _e = insertOrUpdateMatchedFramwork;
                    return [4 /*yield*/, getMatchedFrameworkObject(projectRootUrl, framework, fileUrl)];
                case 12:
                    foundFrameworks = _e.apply(void 0, [_h.sent(), foundFrameworks]);
                    _h.label = 13;
                case 13:
                    if (!(frameworkMatchByPackageJson || frameworkMatchByConfigurationFiles || frameworkMatchByIndexHtml)) return [3 /*break*/, 17];
                    if (!((_a = framework.variant) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 17];
                    toIgnoreIfMultipleFrameworksFound.push(framework.id);
                    _loop_1 = function (variant) {
                        var variantFrameworkDefinition, foundVariantFramrworks, _j;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    variantFrameworkDefinition = framewokDefinitions.find(function (fwk) { return fwk.id === variant; });
                                    if (!variantFrameworkDefinition) return [3 /*break*/, 3];
                                    return [4 /*yield*/, inspect(projectRootUrl, [variantFrameworkDefinition], matchAll, projectFiles)];
                                case 1:
                                    foundVariantFramrworks = _k.sent();
                                    _j = insertOrUpdateMatchedFramwork;
                                    return [4 /*yield*/, getMatchedFrameworkObject(projectRootUrl, framework, fileUrl)];
                                case 2:
                                    foundFrameworks = _j.apply(void 0, [_k.sent(), __spreadArray(__spreadArray([], foundFrameworks, true), foundVariantFramrworks, true)]);
                                    _k.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _f = 0, _g = framework.variant;
                    _h.label = 14;
                case 14:
                    if (!(_f < _g.length)) return [3 /*break*/, 17];
                    variant = _g[_f];
                    return [5 /*yield**/, _loop_1(variant)];
                case 15:
                    _h.sent();
                    _h.label = 16;
                case 16:
                    _f++;
                    return [3 /*break*/, 14];
                case 17:
                    _b++;
                    return [3 /*break*/, 4];
                case 18:
                    _i++;
                    return [3 /*break*/, 3];
                case 19:
                    if (foundFrameworks.length === 1) {
                        return [2 /*return*/, foundFrameworks];
                    }
                    else if (foundFrameworks.length > 1) {
                        if (matchAll) {
                            return [2 /*return*/, foundFrameworks];
                        }
                        else {
                            // if we detect multiple frameworks and the user wants the relevant ones only, we need to filter out the ones we want to ignore.
                            return [2 /*return*/, foundFrameworks.filter(function (f) { return toIgnoreIfMultipleFrameworksFound.includes(f.framework.id) === false; })];
                        }
                    }
                    return [2 /*return*/, []];
            }
        });
    });
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
function inspectByPackageJSONIfExists(framework, root, fileUrl) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var isPackageJson, jsonContentRaw, packageJson, extractedDependencies, extractedDevDependencies, extractedDependenciesKeys, extractedEntryKey, matchedDependencies;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    isPackageJson = isPackageJsonFile(fileUrl);
                    if (!isPackageJson) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, readFile(fileUrl)];
                case 1:
                    jsonContentRaw = _c.sent();
                    if (isValidJson(jsonContentRaw) === false) {
                        console.warn("[".concat(framework.name, "] Could not parse JSON file: ").concat(fileUrl));
                        return [2 /*return*/, null];
                    }
                    packageJson = safeParseJson(jsonContentRaw || "{}");
                    extractedDependencies = packageJson.dependencies || {};
                    extractedDevDependencies = packageJson.devDependencies || {};
                    extractedDependenciesKeys = __spreadArray(__spreadArray([], Object.keys(extractedDependencies), true), Object.keys(extractedDevDependencies), true);
                    extractedEntryKey = packageJson[(_a = framework.package) === null || _a === void 0 ? void 0 : _a.entryKey];
                    if (extractedDependenciesKeys.length === 0) {
                        // if the package.json file does not have any dependencies, we mark it as a match, if the framework is Node.js
                        if (framework.id === "nodejs") {
                            return [2 /*return*/, getMatchedFrameworkObject(root, framework, fileUrl)];
                        }
                        return [2 /*return*/, null];
                    }
                    else if (extractedEntryKey) {
                        return [2 /*return*/, getMatchedFrameworkObject(root, framework, fileUrl)];
                    }
                    else if (extractedDependenciesKeys.length) {
                        matchedDependencies = (_b = framework.package) === null || _b === void 0 ? void 0 : _b.dependencies.filter(function (value) { return extractedDependenciesKeys.includes(value); });
                        if (matchedDependencies === null || matchedDependencies === void 0 ? void 0 : matchedDependencies.length) {
                            return [2 /*return*/, getMatchedFrameworkObject(root, framework, fileUrl)];
                        }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
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
function inspectByConfigurationFileIfExists(framework, root, fileUrl) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var hasConfigFile, outputPath, _i, _c, dependencie, configurationFileContent;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    hasConfigFile = hasConfigurationFiles(framework, fileUrl);
                    if (!hasConfigFile) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, evaluateOutputLocation(framework, root)];
                case 1:
                    outputPath = _d.sent();
                    if (outputPath === null) {
                        return [2 /*return*/, null];
                    }
                    if (!((_a = framework.package) === null || _a === void 0 ? void 0 : _a.dependencies)) return [3 /*break*/, 5];
                    _i = 0, _c = (_b = framework.package) === null || _b === void 0 ? void 0 : _b.dependencies;
                    _d.label = 2;
                case 2:
                    if (!(_i < _c.length)) return [3 /*break*/, 5];
                    dependencie = _c[_i];
                    return [4 /*yield*/, readFile(fileUrl)];
                case 3:
                    configurationFileContent = _d.sent();
                    if (configurationFileContent) {
                        if (configurationFileContent.includes(dependencie)) {
                            return [2 /*return*/, getMatchedFrameworkObject(root, framework, fileUrl)];
                        }
                    }
                    else {
                        if (fileUrl.includes("tree") && hasConfigFile) {
                            return [2 /*return*/, getMatchedFrameworkObject(root, framework, fileUrl)];
                        }
                    }
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: 
                // if no dependencies are defined, we assume that the framework defintion does not require any dependencies for a match.
                return [2 /*return*/, hasConfigFile ? getMatchedFrameworkObject(root, framework, fileUrl) : null];
            }
        });
    });
}
function inspectByIndexHtml(framework, root, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var isStaticDefintion, _i, _a, indexHtmlFile;
        return __generator(this, function (_b) {
            isStaticDefintion = framework.id === "static";
            if (!isStaticDefintion) {
                return [2 /*return*/, null];
            }
            for (_i = 0, _a = framework === null || framework === void 0 ? void 0 : framework.configFiles; _i < _a.length; _i++) {
                indexHtmlFile = _a[_i];
                if (filename.endsWith(indexHtmlFile)) {
                    return [2 /*return*/, getMatchedFrameworkObject(root, framework, filename)];
                }
            }
            return [2 /*return*/, null];
        });
    });
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
    var matchedFiles = 0;
    for (var _i = 0, _a = framework.configFiles; _i < _a.length; _i++) {
        var configFile = _a[_i];
        if (configFile.includes("*")) {
            // we have a wildcard (glob), convert it to a valid regex
            var regex = configFile
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
            var isMatch = new RegExp(regex, "ig").test(filename);
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
function evaluateOutputLocation(framework, root) {
    return __awaiter(this, void 0, void 0, function () {
        var startOfExpression, endOfExpression, expression, _a, jsonFileToParse, jmespathExpression, jsonFileToParsePath, jsonContentRaw, jsonContent, outputLocation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!framework.outputLocation) {
                        return [2 /*return*/, "./"];
                    }
                    if (framework.outputLocation.includes("{") === false) {
                        return [2 /*return*/, framework.outputLocation];
                    }
                    startOfExpression = framework.outputLocation.indexOf("{");
                    endOfExpression = framework.outputLocation.indexOf("}");
                    expression = framework.outputLocation.substring(startOfExpression + 1, endOfExpression).trim();
                    _a = expression.split("#"), jsonFileToParse = _a[0], jmespathExpression = _a[1];
                    jsonFileToParsePath = path.join(root, jsonFileToParse.trim());
                    return [4 /*yield*/, readFile(jsonFileToParsePath)];
                case 1:
                    jsonContentRaw = _b.sent();
                    if (!jsonContentRaw) return [3 /*break*/, 4];
                    if (!isValidJson(jsonContentRaw)) return [3 /*break*/, 3];
                    jsonContent = safeParseJson(jsonContentRaw);
                    return [4 /*yield*/, jmespathSearch(jsonContent, jmespathExpression.trim())];
                case 2:
                    outputLocation = (_b.sent()) || "./";
                    return [2 /*return*/, outputLocation];
                case 3:
                    console.warn("[".concat(framework.name, "] Could not parse JSON file: ").concat(jsonFileToParsePath));
                    _b.label = 4;
                case 4: return [2 /*return*/, "./"];
            }
        });
    });
}
function insertOrUpdateMatchedFramwork(matchedFramework, matchedFrameworks) {
    // if matchedFramework in already in the list, merge the matchedFiles
    var existingFramework = matchedFrameworks.find(function (value) { return value.framework.id === matchedFramework.framework.id; });
    if (existingFramework) {
        existingFramework.matchedFiles = __spreadArray([], new Set(__spreadArray(__spreadArray([], existingFramework.matchedFiles, true), matchedFramework.matchedFiles, true)), true);
    }
    else {
        matchedFrameworks.push(matchedFramework);
    }
    return matchedFrameworks;
}
function getMatchedFrameworkObject(projectRootUrl, framework, filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileUrl, appLocation, _a, repo, owner;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    fileUrl = getUrlFromFilepath(filepath);
                    appLocation = getApplocationUrl(filepath);
                    _a = getRepoInfoFromUrl(projectRootUrl), repo = _a.repo, owner = _a.owner;
                    _b = {
                        repo: repo,
                        owner: owner
                    };
                    _c = {
                        appLocation: appLocation
                    };
                    return [4 /*yield*/, evaluateOutputLocation(framework, projectRootUrl)];
                case 1: return [2 /*return*/, (_b.deployment = (_c.outputLocation = _d.sent(),
                        _c),
                        _b.matchedFiles = [fileUrl],
                        _b.framework = framework,
                        _b)];
            }
        });
    });
}
