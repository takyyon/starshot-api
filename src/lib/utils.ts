import type { Dirent } from "fs";
import stripJsonComments from "strip-json-comments";
const { search } = require("jmespath");
const axios = require('axios').default;
import { AxiosError, AxiosResponse } from 'axios';
import * as FRAMEWORK_DEFINTIIONS from '../data/frameworks.json';
/**
 * Loads a list of files from a dictionary or a GitHub tree.
 * @param root The root directory to load from (or a GitHub project URL).
 *        If a GitHub project URL is provided, it must be of the form:
 *        https://github.com/owner/repo#branch
 * @returns A list of files URLs.
 */
export async function loadProjectFiles(root: string) {
  return await fetchGitHubProjectTrees(root);
}

export function getApplocationUrl(filepath: string) {
  filepath = getUrlFromFilepath(filepath);

  if (filepath.startsWith("http")) {
    const project = getGithubProjectDataFromCache();
    if (project) {
      const { branch, url } = project.$$repo;
      return path.dirname(filepath.replace(url, "").replace(`/blob/${branch}/`, "/"));
    }

    return filepath;
  }

  return path.dirname(filepath);
}

export function getUrlFromFilepath(filepath: string) {
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

export function normalizeUrl(url: string, defaultBranch = "main"): string {
  const [repoUrl, branch = "main"] = url.split("#");

  let normalizedUrl = repoUrl;
  if (repoUrl.startsWith("https://github.com")) {
    // convert HTTP URL to API URL
    // from: https://github.com/owner/repo#branch
    // to: https://api.github.com/repos/owner/repo/git/trees/branch
    normalizedUrl = repoUrl.replace("https://github.com", "https://api.github.com/repos") + `/git/trees/${branch || defaultBranch}`;
  } else {
    // convert relative URL to absolute blob URL (from cache)
    // from: package.json
    // to: https://api.github.com/repos/owner/repo/git/blobs/sha
    const project = getGithubProjectDataFromCache();
    const blobUrl = project?.tree?.find((entry) => entry.path === url)?.url;
    normalizedUrl = blobUrl ?? url;
  }

  return normalizedUrl;
}

export async function callGitHubApi<T>(url: string, isRecursive = true): Promise<[AxiosResponse, T]> {
  if (url.startsWith("https://api.github.com") === false) {
    throw new Error(`Invalid GitHub URL: ${url || "null"}`);
  }

  const token = process.env.GITHUB_TOKEN;

  const options = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: !!token ? `token ${token}` : `Basic ${Buffer.from('takyyon:GITHUB_TOKEN', 'base64').toString('base64')}`,
    },
  };

  if (isRecursive) {
    url = `${url}?recursive=${isRecursive}`;
  }


  const response: AxiosResponse = await axios({ headers: options.headers, url }).then((axiosResponse: AxiosResponse) => {
    return axiosResponse;
  }).catch((error: AxiosError) => {
    if (error.response) {
      return error.response;
    } else {
      throw error.message;
    }
  });

  return [response, (await response.data) as T];
}
export function getGithubProjectDataFromCache(): GitHubTreeResponse {
  return !!process.env.__GITHUB_PROJECT__ ? JSON.parse(process.env.__GITHUB_PROJECT__) : undefined;
}

export function setGithubDataInCache(data: GitHubTreeResponse) {
  process.env.__GITHUB_PROJECT__ = JSON.stringify(data);
}

export function updateGitHubProjectBlobEntryInCache(file: GitHubBlobResponse) {
  const data = getGithubProjectDataFromCache();
  data?.tree
    ?.filter((entry) => entry.url === file.url)
    .map((entry) => {
      entry.$$blob = file;
      return entry;
    });
  setGithubDataInCache(data);
}

export function getRepoInfoFromUrl(projectUrl: string): { repo: string; owner: string } {
  const [_a, _b, _c, owner, repo] = projectUrl.split("/");
  return { repo, owner };
}

/**
 * Fetches a GitHub project tree.
 * @param projectUrl The HTTP URL of the GitHub repository.
 *            The project URL must be of the form: https://github.com/owner/repo#branch
 * @returns An array of files URLs
 */
export async function fetchGitHubProjectTrees(projectUrl: string): Promise<string[]> {
  const [url, branch = "main"] = projectUrl.split("#");
  const repoUrl = normalizeUrl(projectUrl, branch);

  // try fist with the provided branch, or use the default one (main)
  let [response, json] = await callGitHubApi<GitHubTreeResponse>(repoUrl);
  // there is a case where the API returns a 404 if the branch is master,
  // since github transitioned from master to main and there are some regressions for certain repos
  if (response.status === 404 && branch === "master") {
    [response, json] = await callGitHubApi<GitHubTreeResponse>(repoUrl.replace(`/${branch}`, "/main"));
  }

  if (json) {

    json.$$repo = {
      url,
      branch,
    };

    if (json.tree?.length) {
      const files = json.tree.map<string>((entry) => {
        // mock fs.Dirent interface
        (entry as any).isDirectory = () => entry.url.includes("tree");
        (entry as any).name = entry.path;

        return entry.path;
      });

      setGithubDataInCache(json);

      return files;
    }
  }

  return [];
}

export const fs = {
  async readdir(_: string, _options: { withFileTypes: boolean }): Promise<Dirent[]> {
    return [];
  },
  async readFileSync(url: string): Promise<string | null> {
    if (url.includes("/git/trees/")) {
      return null;
    }
    const project = getGithubProjectDataFromCache();
    const file = project?.tree?.find((entry) => entry.url.endsWith(url));

    if (file?.$$blob?.$$content) {
      return file.$$blob?.$$content as string;
    }

    // file content is not in cache, fetch it from GitHub
    const [_, entry] = await callGitHubApi<GitHubBlobResponse>(url);

    if (entry?.content) {
      // NOTE: sometimes the base64 content contains multiple "\n" !!!
      // we need to remove them, otherwise decoding will fail
      entry.content = entry.content.replace(/\n/g, "\r\n");

      // cache the decoded content
      entry.$$content = Buffer.from(entry.content, 'base64').toString('binary');

      updateGitHubProjectBlobEntryInCache(entry);

      return entry.$$content;
    }

    return null;
  },
  existsSync(path: string): boolean {
    const data = getGithubProjectDataFromCache();
    return data?.tree?.some((entry) => entry.path.endsWith(path) || entry.url.endsWith(path));
  },
};
export const path = {
  join(...args: string[]) {
    // File entries got from the GitHub API have unique URLs, for each file entry. Get that URL from the cache
    const fileUrl = args.pop() ?? "";
    const githubEntries = getGithubProjectDataFromCache();
    const entry = githubEntries?.tree?.find((entry: any) => entry.path.endsWith(fileUrl));
    return entry?.url ?? fileUrl;
  },
  resolve(...args: string[]) {
    return args.join("/");
  },
  basename(args: string) {
    return args.split("/").pop();
  },
  dirname: (filepath: string) => {
    return filepath.split("/").slice(0, -1).join("/");
  },
};

export async function jmespathSearch(data: { [key: string]: any }, expression: string): Promise<string> {
  return search(data, expression);
}

export async function readFile(filePath: string) {
  filePath = normalizeUrl(filePath);

  if (fileExists(filePath)) {
    return fs.readFileSync(filePath);
  }
  return null;
}

export function fileExists(filePath: string) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
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
export async function* traverseFolder(folder: string): AsyncGenerator<string> {
  const folders = (await fs.readdir(folder, { withFileTypes: true })) as Dirent[];

  for (const folderEntry of folders) {
    if (folderEntry.name.startsWith(".")) {
      // WARNING: ignore config folders (those that starts with a dot)!
      continue;
    } else if (folderEntry.name.includes("node_modules")) {
      // WARNING: ignore node_modules to avoid perf hits!
      continue;
    }
    const entryPath = path.resolve(folder, folderEntry.name);
    if (folderEntry.isDirectory()) {
      yield* traverseFolder(entryPath);
    } else {
      yield entryPath;
    }
  }
}

export function loadFrameworksDefinitions() {
  return FRAMEWORK_DEFINTIIONS;
}

export function isValidJson(jsonContent: string | null): boolean {
  if (jsonContent === null) {
    return false;
  }

  jsonContent = stripJsonComments(jsonContent);

  try {
    JSON.parse(jsonContent);
    return true;
  } catch {
    return false;
  }
}

export function safeParseJson(jsonContent: string): { [key: string]: any } {
  jsonContent = stripJsonComments(jsonContent);
  return JSON.parse(jsonContent);
}
