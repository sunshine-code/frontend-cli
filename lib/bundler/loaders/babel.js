import { isReact, isTypescript } from "../../utils";

export default (options) => {
  const PLUGINS = options.server && isReact(options.framework) ? [
    "react-hot-loader/babel"
  ] : [];

  const PRESETS = [
    "babel-preset-es2015-webpack",
    isReact(options.framework) && !isTypescript(options.lang) && "babel-preset-react"
  ].filter(Boolean);

  return {
    loader: "babel",
    query: {
      plugins: PLUGINS.map(require.resolve),
      presets: PRESETS.map(require.resolve)
    }
  };
}
