export var fs = {
    "/app": {
        "package.json": "{\n      \"dependencies\": {\n        \"elm\": \"*\",\n        \"elm-lang\": \"*\"\n      }\n    }",
        "elm.json": "{\n      \"type\": \"application\",\n      \"source-directories\": [\n          \"src\"\n      ],\n      \"elm-version\": \"*\",\n      \"dependencies\": {\n          \"direct\": {\n              \"elm/browser\": \"*\",\n              \"elm/core\": \"*\",\n              \"elm/html\": \"*\"\n          },\n          \"indirect\": {\n              \"elm/json\": \"*\",\n              \"elm/time\": \"*\",\n              \"elm/url\": \"*\",\n              \"elm/virtual-dom\": \"*\"\n          }\n      },\n      \"test-dependencies\": {\n          \"direct\": {},\n          \"indirect\": {}\n      }\n    }"
    }
};
