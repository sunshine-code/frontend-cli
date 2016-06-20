import FaviconsPlugin from "favicons-webpack-plugin";

import { resolveExternal, exists, isProduction } from "../../utils";

export default (options) => {
  const FAVICON_PATH = resolveExternal("./app/favicon.png");

  if (!exists(FAVICON_PATH)) return;

  return new FaviconsPlugin({
    logo: FAVICON_PATH,
    prefix: `${isProduction(options.env) ? "icons-[hash:20]" : "icons"}/`
  });
}
