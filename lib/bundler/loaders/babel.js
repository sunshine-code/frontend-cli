import { isReact, isTypescript } from "../../utils";

export default (options) => {
  const PLUGINS =
    options.server && isReact(options.framework)
    ? ["react-hot-loader/babel"]
    : [];

  const PRESETS = [
    "babel-preset-es2015-webpack",
    "babel-preset-stage-1",
    isReact(options.framework) && !isTypescript(options.lang) && "babel-preset-react"
  ].filter(Boolean);

  return {
    loader: "babel-loader",
    query: {
      plugins: PLUGINS.map(require.resolve),
      presets: PRESETS.map(require.resolve)
    }
  };
}
