const BABEL_OPTIONS = {
  plugins: [
    "transform-es2015-modules-commonjs",
    "transform-async-to-generator",
    "transform-system-import-commonjs"
  ],
  ignore: false,
  only: /frontend-cli\/lib/
};

require("babel-register")(BABEL_OPTIONS);
