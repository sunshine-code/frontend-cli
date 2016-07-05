import { optimize } from "webpack";

export default () => new optimize.UglifyJsPlugin({
  compress: {
    collapse_vars: true,
    warnings: false,
    drop_console: true
  }
});
