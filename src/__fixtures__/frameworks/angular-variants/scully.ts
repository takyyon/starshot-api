export const fs = {
  "/app": {
    "package.json": `{
      "dependencies": {
        "@scullyio/scully": "*",
        "@scullyio/init": "*"
      }
    }`,
    "tsconfig.json": `{
      "compilerOptions": {
        "outDir": "./dist/out-tsc"
      }
    }`,
    "scully.app.config.ts": ``,
    "angular.json": `{
      "projects": {
        "app": {
          "architect": {
            "build": {
              "options": {
                "outputPath": "dist/app"
              }
            }
          }
        }
      }
    }`,
  },
};
