import { LoaderOptionsPlugin } from "webpack";

import scssSyntax from "postcss-scss";
import stylelint from "stylelint";
import postcssReporter from "postcss-reporter";
import autoprefixer from "autoprefixer";
import cssnext from "postcss-cssnext";
import postcssFocus from "postcss-focus";

import { SCSS, POSTCSS, OUTPUT_PATH } from "../../constants";
import {
  isProduction,
  isSCSS,
  resolveExternal,
  resolveInternal,
  exists
} from "../../utils";

const STYLELINT_INTERNAL_CONFIG = resolveInternal("lib", "generators", "common", "stylelint", "templates", ".stylelintrc");
const STYLELINT = stylelint({
  configFile: !exists(resolveExternal(".stylelintrc")) && STYLELINT_INTERNAL_CONFIG
});

const POSTCSS_REPORTER = postcssReporter({ clearMessages: true });

const POSTCSS_PLUGINS = {
  [SCSS]: [STYLELINT, autoprefixer, POSTCSS_REPORTER],
  [POSTCSS]: [STYLELINT, cssnext, postcssFocus, POSTCSS_REPORTER]
};

export default (options) => [
  new LoaderOptionsPlugin({
    test: /\.s?css$/i,
    options: {
      postcss: {
        plugins: POSTCSS_PLUGINS[options.styles],
        syntax: isSCSS(options.styles) && scssSyntax
      },
      // Needed for sourceMap resolving in the sass-loader and css-loader
      context: process.cwd()
    }
  })
];
