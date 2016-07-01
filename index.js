#!/usr/bin/env node

const BABEL_OPTIONS = {
  plugins: [
    "transform-es2015-modules-commonjs",
    "transform-system-import-commonjs"
  ],
  ignore: false,
  only: /frontend\/lib/
};

require("babel-register")(BABEL_OPTIONS);
require("./lib/cli");
