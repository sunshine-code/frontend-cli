import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";

import { resolve, exists, humanize, isProduction } from "../../utils";

const EJS_TEMPLATE_PATH = "./app/index.ejs";
const HTML_TEMPLATE_PATH = "./app/index.html";
const INTERNAL_TEMPLATE_PATH = "../../../templates/html/index.ejs";

export default (options) => {
  let templatePath, p;

  if (exists(p = resolve(HTML_TEMPLATE_PATH))) {
    templatePath = p;
  } else if (exists(p = resolve(EJS_TEMPLATE_PATH))) {
    templatePath = p;
  } else {
    templatePath = path.resolve(__dirname, INTERNAL_TEMPLATE_PATH);
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

  return new HTMLWebpackPlugin(config);
}
