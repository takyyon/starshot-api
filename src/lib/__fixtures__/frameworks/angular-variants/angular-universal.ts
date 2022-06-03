export const fs = {
  "/app": {
    "package.json": `{
      "dependencies": {
        "@angular/platform-server": "*"
      }
    }`,
    "tsconfig.server.json": `{
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
                "outputPath": "dist/app/browser"
              }
            }
          }
        }
      }
    }`,
  },
};
