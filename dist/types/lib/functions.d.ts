export declare const getFrameworks: (org: string, repo: string, branch?: string, githubToken?: string) => Promise<FrameworkMatch[]>;
export declare const getRecommendation: (frameworks: FrameworkMatch[], org: string, repo: string, branch?: string, githubToken?: string) => Promise<RecommendationType>;
