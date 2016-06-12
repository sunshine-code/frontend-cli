import { resolve } from "../../utils";

export default (options) => {
  let presets = ["es2015-webpack"];

  if (options.framework == "react") presets.push("react");

  return {
    test: /\.jsx?$/i,
    include: resolve("app"),
    loader: "babel",
    query: { presets: presets }
  };
}
