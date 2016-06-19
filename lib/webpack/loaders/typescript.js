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
    resolveInternalModule("babel-preset-es2015-webpack")
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
          plugins: PLUGINS,
          presets: PRESETS
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
