import webpack from "webpack";

import { DEVELOPMENT, PRODUCTION } from "../constants";

const LOADERS = [
  "static",
  "javascript",
  "scss"
];

const PLUGINS = {
  common: [
    "no-errors",
    "extract-text",
    "html",
    "favicons",
  ],
  [DEVELOPMENT]: [
    "visualizer"
  ],
  [PRODUCTION]: [
    "clean",
    "dedupe",
    "uglify-js",
    "commons-chunk",
    "hashed-module-ids",
    "inline-manifest"
  ]
}

export default class Webpack {
  constructor(options) {
    this.options = options;

    Promise.all([
      this.loadConfig("./loaders", LOADERS),
      this.loadConfig("./plugins", PLUGINS.common.concat(PLUGINS[this.options.env]))
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
      let configs = [];

      modules.forEach(module => {
        let config = module.default(this.options);
        if (!config) return;

        // Modules can export objects or arrays of objects
        configs = configs.concat(config);
      });

      return configs;
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
    console.log(stats.toString({
      assets: false,
      chunkModules: false,
      children: false,
      colors: true
    }));
  }
}
