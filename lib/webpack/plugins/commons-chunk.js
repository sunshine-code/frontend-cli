import { optimize } from "webpack";

let filterVendorModules = (module) => /node_modules/.test(module.resource);

export default () => [
  new optimize.CommonsChunkPlugin({
    async: true,
    minChunks: filterVendorModules
  }),
  new optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: filterVendorModules
  }),
  new optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  })
];
