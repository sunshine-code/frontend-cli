import FaviconsPlugin from "favicons-webpack-plugin";

import { resolveExternal, exists, isProduction } from "../../utils";

export default (options) => {
  const ICONS_DIR = isProduction(options.env) ? "icons-[hash:20]" : "icons";
  const FAVICON_PATH = resolveExternal("./app/favicon.png");

  if (exists(FAVICON_PATH)) {
    return new FaviconsPlugin({
      logo: FAVICON_PATH,
      prefix: `${ICONS_DIR}/`
    });
  }
}
