"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
exports.fs = {
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
//# sourceMappingURL=monorepo.js.map