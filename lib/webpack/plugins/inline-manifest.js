import InlineManifestPlugin from "inline-manifest-webpack-plugin";

export default () => new InlineManifestPlugin({
  name: "webpackManifest"
});
