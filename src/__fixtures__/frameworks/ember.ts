export const fs = {
  "/app": {
    "package.json": `{
      "devDependencies": {
        "@ember/optional-features": "*",
        "@glimmer/component": "*",
        "@glimmer/tracking": "*",
        "babel-eslint": "*",
        "broccoli-asset-rev": "*",
        "ember-auto-import": "*",
        "ember-cli": "*",
        "ember-cli-app-version": "*",
        "ember-cli-babel": "*",
        "ember-cli-dependency-checker": "*",
        "ember-cli-htmlbars": "*",
        "ember-cli-inject-live-reload": "*",
        "ember-cli-sri": "*",
        "ember-cli-uglify": "*",
        "ember-export-application-global": "*",
        "ember-fetch": "*",
        "ember-load-initializers": "*",
        "ember-maybe-import-regenerator": "*",
        "ember-resolver": "*",
        "ember-source": "*",
        "ember-template-lint": "*"
      },
      "ember": {
        "edition": "octane"
      }
    }`,
    ".ember.cli": `{
      /**
        Ember CLI sends analytics information by default. The data is completely
        anonymous, but there are times when you might want to disable this behavior.

        Setting disableAnalytics to true will prevent any data from being sent.
      */
      "disableAnalytics": false
    }`
  },
};
