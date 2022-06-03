export var fs = {
    "/app": {
        "package.json": "{\n      \"dependencies\": {\n        \"@scullyio/scully\": \"*\",\n        \"@scullyio/init\": \"*\"\n      }\n    }",
        "tsconfig.json": "{\n      \"compilerOptions\": {\n        \"outDir\": \"./dist/out-tsc\"\n      }\n    }",
        "scully.app.config.ts": "",
        "angular.json": "{\n      \"projects\": {\n        \"app\": {\n          \"architect\": {\n            \"build\": {\n              \"options\": {\n                \"outputPath\": \"dist/app\"\n              }\n            }\n          }\n        }\n      }\n    }"
    }
};
