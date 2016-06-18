import FaviconsPlugin from "favicons-webpack-plugin";

import { resolve, exists, isProduction } from "../../utils";

export default (options) => {
  const ICONS_DIR = isProduction(options.env) ? "icons-[hash:20]" : "icons";
  let favicon = resolve("./app/favicon.png");

  if (exists(favicon)) {
    return new FaviconsPlugin({
      logo: favicon,
      prefix: `${ICONS_DIR}/`
    });
  }
}
