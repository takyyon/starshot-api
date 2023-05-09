import { recommendService, inspect } from "./detectors";

const getProjectUrl = (org: string, repo: string, branch?: string) => {
    return `https://github.com/${org}/${repo}${branch ? `#${branch}`: ''}`;
};

export const getFrameworks = (org: string, repo: string, branch?: string): Promise<FrameworkMatch[]> => {
    const projectUrl = getProjectUrl(org, repo, branch);
    return inspect(projectUrl, [], true, []);
};

export const getRecommendation = (frameworks: FrameworkMatch[], org: string, repo: string, azd: boolean, branch?: string): Promise<RecommendationType> => {
    const projectUrl = getProjectUrl(org, repo, branch);

    return Promise.resolve(recommendService(frameworks, projectUrl, azd));
};