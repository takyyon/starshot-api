export var fs = {
    "/app": {
        "package.json": "{\n      \"dependencies\": {\n        \"@angular/platform-server\": \"*\"\n      }\n    }",
        "tsconfig.server.json": "{\n      \"compilerOptions\": {\n        \"outDir\": \"./dist/out-tsc\"\n      }\n    }",
        "angular.json": "{\n      \"projects\": {\n        \"app\": {\n          \"architect\": {\n            \"build\": {\n              \"options\": {\n                \"outputPath\": \"dist/app/browser\"\n              }\n            }\n          }\n        }\n      }\n    }"
    }
};
