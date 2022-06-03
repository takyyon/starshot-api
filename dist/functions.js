"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFrameworks = void 0;
const detectors_1 = require("./detectors");
const getFrameworks = (org, repo, branch, githubToken) => {
    console.log(githubToken);
    const projectUrl = `https://github.com/${org}/${repo}${`${branch}? : #${branch}: ''`}`;
    return (0, detectors_1.inspect)(projectUrl, [], true);
};
exports.getFrameworks = getFrameworks;
//# sourceMappingURL=functions.js.map