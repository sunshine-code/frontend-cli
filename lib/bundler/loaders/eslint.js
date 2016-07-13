import { resolveInternal, resolveExternal, exists } from "../../utils";

const ESLINT_INTERNAL_CONFIG = resolveInternal("lib", "generators", "common", "eslint", "templates", ".eslintrc");

export default () => {
  return {
    loader: "eslint-loader",
    query: {
      configFile: !exists(resolveExternal(".eslintrc")) && ESLINT_INTERNAL_CONFIG
    }
  }
}
