import { inspect } from "./detectors";
export var getFrameworks = function (org, repo, branch, githubToken) {
    var projectUrl = "https://github.com/".concat(org, "/").concat(repo).concat("".concat(branch, "? : #").concat(branch, ": ''"));
    return inspect(projectUrl, [], true);
};
