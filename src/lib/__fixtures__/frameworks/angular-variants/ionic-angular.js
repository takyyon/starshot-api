export var fs = {
    "/app": {
        "package.json": "{\n      \"dependencies\": {\n        \"@ionic/angular\": \"*\"\n      }\n    }",
        "tsconfig.json": "{\n      \"compilerOptions\": {\n        \"outDir\": \"./dist/out-tsc\"\n      }\n    }",
        "angular.json": "{\n      \"projects\": {\n        \"app\": {\n          \"architect\": {\n            \"build\": {\n              \"options\": {\n                \"outputPath\": \"www\"\n              }\n            }\n          }\n        }\n      }\n    }"
    }
};
