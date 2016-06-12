import path from "path";
import HTMLPlugin from "html-webpack-plugin";

import { HTML_TEMPLATE_PATH, EJS_TEMPLATE_PATH } from "../../constants";
import { resolve, exists, humanize, isProduction } from "../../utils";

export default (options) => {
  let templatePath, p;

  if (exists(p = resolve(HTML_TEMPLATE_PATH))) {
    templatePath = p;
  } else if (exists(p = resolve(EJS_TEMPLATE_PATH))) {
    templatePath = p;
  } else {
    templatePath = path.resolve(__dirname, "../../../templates/html/index.ejs");
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
