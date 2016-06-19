import { ENTRY_PATH } from "../../constants";
import { resolve } from "../../utils";

export default (options) => {
  let compilerOptions = {
    target: "es6"
  };

  if (options.framework == "react") compilerOptions.jsx = "React";

  return {
    test: /\.tsx?$/i,
    include: resolve(ENTRY_PATH),
    loaders: [
      {
        loader: "babel",
        query: { presets: [require.resolve("babel-preset-es2015-webpack")] }
      },
      {
        loader: "ts",
        query: {
          compilerOptions: compilerOptions
        }
      }
    ]
  };
}
