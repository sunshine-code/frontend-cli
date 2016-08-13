import { isProduction } from "../../utils";

export default (options, query = {}) => {
  return {
    loader: "css",
    query: Object.assign({
      sourceMap: true,
      modules: true,
      localIdentName: isProduction(options.env) ? "[hash:base64]" : "[name]__[local]__[hash:base64:5]",
      camelCase: true,
      minimize: isProduction(options.env)
    }, query)
  }
}
