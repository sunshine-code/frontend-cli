export default () => {
  return {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
    loader: "file-loader",
    query: { name: "assets/[name]-[hash].[ext]" }
  };
}
