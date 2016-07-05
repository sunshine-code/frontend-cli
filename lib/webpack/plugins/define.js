import { DefinePlugin } from "webpack";

import { isDevelopment, isProduction, isTest } from "../../utils";

export default (options) => new DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || Symbol.keyFor(options.env))
  },
  isDevelopment: isDevelopment(options.env),
  isTest: isTest(options.env),
  isProduction: isProduction(options.env)
});
