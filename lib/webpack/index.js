import webpack from "webpack";

import { isProduction } from "../utils";

export default class Webpack {
  constructor(options) {
    this.options = options;

    Promise.all([this.loadPlugins(), this.loadLoaders()])
      .then(this.loadBaseConfig.bind(this))
      .then(this.initCompiler.bind(this))
      .catch(error => console.error("%s: %s", error.name, error.message));
  }

  loadPlugins() {
    let pluginModules = [
      "no-errors",
      "extract-text",
      "html"
    ];

    let productionPluginModules = [
      "uglify-js"
    ];

    if (isProduction(this.options.env)) pluginModules = pluginModules.concat(productionPluginModules);

    return Promise.all(pluginModules.map(m => System.import(`./plugins/${m}`)));
  }

  loadLoaders() {
    let loaderModules = [
      "static",
      "javascript",
      "scss"
    ];

    return Promise.all(loaderModules.map(m => System.import(`./loaders/${m}`)));
  }

  loadBaseConfig(configs) {
    let [plugins, loaders] = configs.map(modules => modules.map(m => m.default(this.options)));

    return System.import("./base").then(m => m.default(this.options, { plugins: plugins, loaders: loaders }));
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
