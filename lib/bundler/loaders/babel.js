import { isReact, isTypescript } from "../../utils";

export default (options, query = {}) => {
  const PLUGINS = options.server && isReact(options.framework) ? [
    "react-hot-loader/babel"
  ] : [];

  const PRESETS = [
    ["babel-preset-es2015", { modules: false }],
    "babel-preset-stage-0",
    isReact(options.framework) && !isTypescript(options.lang) && "babel-preset-react"
  ].filter(Boolean);

  return {
    loader: "babel",
    query: Object.assign({
      plugins: PLUGINS.map(resolve),
      presets: PRESETS.map(resolve)
    }, query)
  };
}

function resolve(pkg) {
  if (Array.isArray(pkg)) {
    pkg[0] = require.resolve(pkg[0]);
  } else {
    pkg = require.resolve(pkg);
  }

  return pkg;
}
