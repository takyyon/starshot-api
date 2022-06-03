"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
exports.fs = {
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
//# sourceMappingURL=angular-universal.js.map