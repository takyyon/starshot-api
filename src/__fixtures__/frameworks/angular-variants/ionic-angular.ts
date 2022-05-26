export const fs = {
  "/app": {
    "package.json": `{
      "dependencies": {
        "@ionic/angular": "*"
      }
    }`,
    "tsconfig.json": `{
      "compilerOptions": {
        "outDir": "./dist/out-tsc"
      }
    }`,
    "angular.json": `{
      "projects": {
        "app": {
          "architect": {
            "build": {
              "options": {
                "outputPath": "www"
              }
            }
          }
        }
      }
    }`,
  },
};
