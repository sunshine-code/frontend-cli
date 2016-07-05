import path from "path";
import HtmlPlugin from "html-webpack-plugin";

import { ENTRY_PATH } from "../../constants";
import {
  resolveExternal,
  resolveInternal,
  exists,
  humanize,
  isProduction
} from "../../utils";

const HTML_TEMPLATE_PATH = resolveExternal(ENTRY_PATH, "index.html");
const EJS_TEMPLATE_PATH = resolveExternal(ENTRY_PATH, "index.ejs");

export default (options) => {
  let templatePath;

  if (exists(HTML_TEMPLATE_PATH)) {
    templatePath = HTML_TEMPLATE_PATH;
  } else if (exists(EJS_TEMPLATE_PATH)) {
    templatePath = EJS_TEMPLATE_PATH;
  } else {
    templatePath = resolveInternal("lib", "generators", "common", "html", "templates", "index.ejs");
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

  return new HtmlPlugin(config);
}
