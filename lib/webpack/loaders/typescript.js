import { ENTRY_PATH } from "../../constants";
import {
  isReact,
  resolveExternal
} from "../../utils";

export default (options) => {
  const PLUGINS = options.server && isReact(options.framework) ? [
    "react-hot-loader/babel"
  ] : [];

  const PRESETS = [
    "babel-preset-es2015-webpack"
  ];

  const COMPILER_OPTIONS = {
    target: "es6",
    jsx: isReact(options.framework) ? "React" : "Preserve"
  };

  return {
    test: /\.tsx?$/i,
    include: resolveExternal(ENTRY_PATH),
    loaders: [
      {
        loader: "babel",
        query: {
          plugins: PLUGINS.map(require.resolve),
          presets: PRESETS.map(require.resolve)
        }
      },
      {
        loader: "ts",
        query: {
          compilerOptions: COMPILER_OPTIONS
        }
      }
    ]
  };
}
