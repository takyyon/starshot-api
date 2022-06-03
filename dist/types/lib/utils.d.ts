import type { Dirent } from "fs";
/**
 * Loads a list of files from a dictionary or a GitHub tree.
 * @param root The root directory to load from (or a GitHub project URL).
 *        If a GitHub project URL is provided, it must be of the form:
 *        https://github.com/owner/repo#branch
 * @returns A list of files URLs.
 */
export declare function loadProjectFiles(root: string): Promise<string[]>;
export declare function getApplocationUrl(filepath: string): string;
export declare function getUrlFromFilepath(filepath: string): string;
export declare function normalizeUrl(url: string, defaultBranch?: string): string;
export declare function callGitHubApi<T>(url: string, isRecursive?: boolean): Promise<[Response, T]>;
export declare function getGithubProjectDataFromCache(): GitHubTreeResponse;
export declare function setGithubDataInCache(data: GitHubTreeResponse): void;
export declare function updateGitHubProjectBlobEntryInCache(file: GitHubBlobResponse): void;
export declare function getRepoInfoFromUrl(projectUrl: string): {
    repo: string;
    owner: string;
};
/**
 * Fetches a GitHub project tree.
 * @param projectUrl The HTTP URL of the GitHub repository.
 *            The project URL must be of the form: https://github.com/owner/repo#branch
 * @returns An array of files URLs
 */
export declare function fetchGitHubProjectTrees(projectUrl: string): Promise<string[]>;
export declare const fs: {
    readdir(_: string, _options: {
        withFileTypes: boolean;
    }): Promise<Dirent[]>;
    readFileSync(url: string): Promise<string | null>;
    existsSync(path: string): boolean;
};
export declare const path: {
    join(...args: string[]): string;
    resolve(...args: string[]): string;
    basename(args: string): string | undefined;
    dirname: (filepath: string) => string;
};
export declare function jmespathSearch(data: {
    [key: string]: any;
}, expression: string): Promise<string>;
export declare function readFile(filePath: string): Promise<string | null>;
export declare function fileExists(filePath: string): boolean;
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
export declare function traverseFolder(folder: string): AsyncGenerator<string>;
export declare function loadFrameworksDefinitions(): FrameworkDefinition[];
export declare function isValidJson(jsonContent: string | null): boolean;
export declare function safeParseJson(jsonContent: string): {
    [key: string]: any;
};
