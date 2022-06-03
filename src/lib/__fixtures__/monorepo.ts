export const fs = {
  "/app": {
    "package.json": `{}`,
    glimmer: {
      "package.json": `{
        "dependencies": {
          "@glimmer/core": "*"
        }
      }`,
    },
    vue: {
      "package.json": `{
        "dependencies": {
          "vue": "*"
        }
      }`,
    },
    angular: {
      "package.json": `{
        "dependencies": {
          "@angular/core": "*"
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
                  "outputPath": "dist/app"
                }
              }
            }
          }
        }
      }`,
    },
  },
};
