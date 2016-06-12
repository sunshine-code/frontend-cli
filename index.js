#!/usr/bin/env node

const BABEL_OPTIONS = {
  presets: ["es2015"],
  plugins: ["transform-system-import-commonjs"],
  ignore: false,
  only: /frontend\/lib/
};

require("babel-register")(BABEL_OPTIONS);
require("./lib/cli");
