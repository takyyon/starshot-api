export var fs = {
    "/app": {
        "package.json": "{}",
        glimmer: {
            "package.json": "{\n        \"dependencies\": {\n          \"@glimmer/core\": \"*\"\n        }\n      }"
        },
        vue: {
            "package.json": "{\n        \"dependencies\": {\n          \"vue\": \"*\"\n        }\n      }"
        },
        angular: {
            "package.json": "{\n        \"dependencies\": {\n          \"@angular/core\": \"*\"\n        }\n      }",
            "tsconfig.json": "{\n        \"compilerOptions\": {\n          \"outDir\": \"./dist/out-tsc\"\n        }\n      }",
            "angular.json": "{\n        \"projects\": {\n          \"app\": {\n            \"architect\": {\n              \"build\": {\n                \"options\": {\n                  \"outputPath\": \"dist/app\"\n                }\n              }\n            }\n          }\n        }\n      }"
        }
    }
};
