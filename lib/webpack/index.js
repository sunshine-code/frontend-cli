import webpack from "webpack";

import { isProduction } from "../utils";

const LOADERS = [
  "static",
  "javascript",
  "scss"
];

const PLUGINS = [
  "no-errors",
  "clean",
  "extract-text",
  "html"
];

const PLUGINS_PROD = [
  "dedupe",
  "uglify-js",
  "commons-chunk",
  "hashed-module-ids",
  "inline-manifest"
];

export default class Webpack {
  constructor(options) {
    this.options = options;

    Promise.all([
      this.loadConfig("./loaders", LOADERS),
      this.loadConfig("./plugins", PLUGINS.concat(isProduction(this.options.env) ? PLUGINS_PROD : []))
    ])
      .then(this.loadBaseConfig.bind(this))
      .then(this.initCompiler.bind(this))
      .catch(error => console.error("%s: %s", error.name, error.message));
  }

  loadConfig(path, moduleNames) {
    let modules = moduleNames.map(name => {
      let filename = [path, name].join("/");
      return System.import(filename);
    });

    return Promise.all(modules).then(modules => {
      let config = [];
      modules.forEach(module => {
        // Modules can export objects or arrays of objects
        config = config.concat(module.default(this.options));
      });

      return config;
    });
  }

  loadBaseConfig([loaders, plugins]) {
    let config = { loaders: loaders, plugins: plugins };
    return System.import("./base").then(m => m.default(this.options, config));
  }

  initCompiler(config) {
    this.config = config;
    this.compiler = webpack(this.config);
    this.compiler.run(this.logger.bind(this));
  }

  logger(error, stats) {
    console.log(stats.toString({ colors: true }));
  }
}
