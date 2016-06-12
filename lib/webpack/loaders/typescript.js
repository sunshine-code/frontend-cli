import { resolve } from "../../utils";

export default (options) => {
  let compilerOptions = {
    target: "es6"
  };

  if (options.framework == "react") compilerOptions.jsx = "React";

  return {
    test: /\.tsx?$/i,
    include: resolve("app"),
    loaders: [
      {
        loader: "babel",
        query: { presets: ["es2015-webpack"] }
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
