export const fs = {
  "/app": {
    "tsconfig.json": `{
      "compilerOptions": {
        "outDir": "./dist/app"
      }
    }`,
    "package.json": `{
      "dependencies": {
        "aurelia-bootstrapper": "*"
      }
    }`,
  },
};
