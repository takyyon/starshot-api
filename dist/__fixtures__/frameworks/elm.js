"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
exports.fs = {
    "/app": {
        "package.json": `{
      "dependencies": {
        "elm": "*",
        "elm-lang": "*"
      }
    }`,
        "elm.json": `{
      "type": "application",
      "source-directories": [
          "src"
      ],
      "elm-version": "*",
      "dependencies": {
          "direct": {
              "elm/browser": "*",
              "elm/core": "*",
              "elm/html": "*"
          },
          "indirect": {
              "elm/json": "*",
              "elm/time": "*",
              "elm/url": "*",
              "elm/virtual-dom": "*"
          }
      },
      "test-dependencies": {
          "direct": {},
          "indirect": {}
      }
    }`
    },
};
//# sourceMappingURL=elm.js.map