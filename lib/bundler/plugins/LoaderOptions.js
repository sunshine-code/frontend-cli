import { LoaderOptionsPlugin } from "webpack";

import stylelint from "stylelint";
import postcssFocus from "postcss-focus";
import postcssReporter from "postcss-reporter";

import { isSCSS, resolveExternal, resolveInternal, exists } from "../../utils";

const STYLELINT_INTERNAL_CONFIG = resolveInternal("lib", "generators", "common", "stylelint", "templates", ".stylelintrc");
const STYLELINT = stylelint({
  configFile: !exists(resolveExternal(".stylelintrc")) && STYLELINT_INTERNAL_CONFIG
});

const POSTCSS_REPORTER = postcssReporter({ clearMessages: true });

export default async (options) => {
  let postcssPlugins;
  let postcssSyntax;

  if (isSCSS(options.styles)) {
    const autoprefixer = await System.import("autoprefixer");
    postcssPlugins = [STYLELINT, autoprefixer, postcssFocus, POSTCSS_REPORTER];

    postcssSyntax = await System.import("postcss-scss");
  } else {
    const cssNext = await System.import("postcss-cssnext");
    postcssPlugins = [STYLELINT, cssNext, postcssFocus, POSTCSS_REPORTER];
  }

  return [
    new LoaderOptionsPlugin({
      test: /\.s?css$/i,
      options: {
        postcss: {
          plugins: postcssPlugins,
          syntax: postcssSyntax
        },
        // Needed for sourceMap resolving in the sass-loader and css-loader
        context: process.cwd()
      }
    })
  ];
}
