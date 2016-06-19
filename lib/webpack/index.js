import webpack from "webpack";

import { DEVELOPMENT, PRODUCTION, WEBPACK_STATS } from "../constants";

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
  server: [
    "hot-module-replacement"
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
  }

  init() {
    const PLUGINS_ARRAY = PLUGINS.common
      .concat(PLUGINS[this.options.env])
      .concat(this.options.server ? PLUGINS.server : []);

    return Promise.all([
      this.loadConfig("./loaders", LOADERS),
      this.loadConfig("./plugins", PLUGINS_ARRAY)
    ])
      .then(this.loadBaseConfig.bind(this))
      .then(this.initCompiler.bind(this))
      .catch(error => console.error("%s: %s", error.name, error.message));
  }

  run() {
    this.init().then(compiler => compiler.run(this.logger.bind(this)));
  }

  loadConfig(path, moduleNames) {
    let modules = moduleNames.map(name => {
      let filename = [path, name].join("/");
      return System.import(filename);
    });

    return Promise.all(modules).then(modules => {
      // Modules can export objects, arrays of objects and falsy values
      return modules
        .reduce((configs, module) => configs.concat(module.default(this.options)), [])
        .filter(Boolean);
    });
  }

  loadBaseConfig([loaders, plugins]) {
    let config = { loaders: loaders, plugins: plugins };
    return System.import("./base").then(m => m.default(this.options, config));
  }

  initCompiler(config) {
    this.config = config;
    this.compiler = webpack(this.config);
    return this.compiler;
  }

  logger(error, stats) {
    console.log(stats.toString(WEBPACK_STATS));
  }
}
