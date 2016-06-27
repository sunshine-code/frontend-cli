import { isReact, resolveExternal } from "../../utils";
import babelLoader from "./babel";

export default (options) => {
  const COMPILER_OPTIONS = {
    target: "es6",
    jsx: isReact(options.framework) ? "React" : "Preserve"
  };

  return {
    test: /\.tsx?$/i,
    loaders: [
      babelLoader(options),
      {
        loader: "ts",
        query: {
          compilerOptions: COMPILER_OPTIONS
        }
      }
    ]
  };
}
