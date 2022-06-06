import { inspect } from "./detectors";

export const getFrameworks = (org: string, repo: string, branch?: string, githubToken?: string): Promise<FrameworkMatch[]> => {
    console.log(githubToken);
    const projectUrl = `https://github.com/${org}/${repo}${`${branch}? : #${branch}: ''`}`;
    return inspect(projectUrl, [], true);
};

export const getRecommendation = (frameworks: FrameworkMatch[], org: string, repo: string, branch?: string, githubToken?: string): Promise<RecommendationType> => {
    console.log(githubToken);
    const projectUrl = `https://github.com/${org}/${repo}${`${branch}? : #${branch}: ''`}`;
    console.log(projectUrl);
    console.log(frameworks);
    return Promise.resolve('webapp');
};