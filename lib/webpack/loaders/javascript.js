import { ENTRY_PATH } from "../../constants";
import {
  isReact,
  resolveExternal,
  resolveExternalModule,
  resolveInternalModule
} from "../../utils";

export default (options) => {
  const PLUGINS = options.server && isReact(options.framework) ? [
    resolveExternalModule("react-hot-loader/babel")
  ] : [];

  const PRESETS = [
    resolveInternalModule("babel-preset-es2015-webpack"),
    isReact(options.framework) && resolveExternalModule("babel-preset-react")
  ].filter(Boolean);

  return {
    test: /\.jsx?$/i,
    include: resolveExternal(ENTRY_PATH),
    loader: "babel",
    query: {
      plugins: PLUGINS,
      presets: PRESETS
    }
  };
}
