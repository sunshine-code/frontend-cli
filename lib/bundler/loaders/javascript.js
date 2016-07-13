import babelLoader from "./babel";
import eslintLoader from "./eslint";

export default (options) => {
  return {
    test: /\.jsx?$/i,
    exclude: /node_modules/,
    loaders: [
      babelLoader,
      eslintLoader
    ].map(l => l(options))
  };
}
