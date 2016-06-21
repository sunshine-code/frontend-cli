import { ENTRY_PATH } from "../../constants";
import {
  isReact,
  resolveExternal,
} from "../../utils";

export default (options) => {
  const PLUGINS = options.server && isReact(options.framework) ? [
    "react-hot-loader/babel"
  ] : [];

  const PRESETS = [
    "babel-preset-es2015-webpack",
    isReact(options.framework) && "babel-preset-react"
  ].filter(Boolean);

  return {
    test: /\.jsx?$/i,
    include: resolveExternal(ENTRY_PATH),
    loader: "babel",
    query: {
      plugins: PLUGINS.map(require.resolve),
      presets: PRESETS.map(require.resolve)
    }
  };
}
