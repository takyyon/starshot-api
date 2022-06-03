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
export declare function inspect(projectRootUrl: string, framewokDefinitions?: FrameworkDefinition[], matchAll?: boolean, projectFiles?: string[]): Promise<FrameworkMatch[]>;
