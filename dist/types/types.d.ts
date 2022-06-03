
declare interface FrameworkDefinition {
  id: string;
  name: string;
  configFiles?: string[];
  outputLocation?: string;
  package?: {
    dependencies: string[];
    entryKey?: string;
  };
  variant?: string[];
}

declare interface FrameworkMatch {
  matchedFiles: string[];
  framework: FrameworkDefinition;
  repo: string;
  owner: string;
  deployment: {
    appLocation: string;
    apiLocaltion?: string;
    outputLocation: string;
  }
}

declare interface GitHubTreeResponse {
  sha: string;
  url: string;
  truncated: boolean;
  tree: Array<GitHubTreeEntry>;
  $$repo: {
    url: string;
    branch: string;
  }
}

declare interface GitHubTreeEntry {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
  $$blob?: GitHubBlobResponse;
}

declare interface GitHubBlobResponse {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  $$content?: string;
  encoding: "base64";
}
