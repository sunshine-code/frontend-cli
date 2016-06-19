import path from "path";
import HTMLPlugin from "html-webpack-plugin";

import { HTML_TEMPLATE_PATH, EJS_TEMPLATE_PATH } from "../../constants";
import { resolveExternal, resolveInternal, exists, humanize, isProduction } from "../../utils";

export default (options) => {
  let templatePath, p;

  if (exists(p = resolveExternal(HTML_TEMPLATE_PATH))) {
    templatePath = p;
  } else if (exists(p = resolveExternal(EJS_TEMPLATE_PATH))) {
    templatePath = p;
  } else {
    templatePath = resolveInternal("./templates/html/index.ejs");
  }

  let minificationOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  };

  let config = {
    title: humanize(path.basename(process.cwd())),
    template: templatePath,
    inject: true,
    minify: isProduction(options.env) && minificationOptions
  };

  return new HTMLPlugin(config);
}
