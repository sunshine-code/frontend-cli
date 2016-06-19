import { ENTRY_PATH } from "../../constants";
import { resolve } from "../../utils";

export default (options) => {
  let presets = ["es2015-webpack"];

  if (options.framework == "react") presets.push("react");

  return {
    test: /\.jsx?$/i,
    include: resolve(ENTRY_PATH),
    loader: "babel",
    query: { presets: presets.map(p => require.resolve(`babel-preset-${p}`)) }
  };
}
