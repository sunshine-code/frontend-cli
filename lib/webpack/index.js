import webpack from "webpack";
import path from "path";
import { extensions } from "interpret";
import { smart as smartMerge } from "webpack-merge";

import { DEVELOPMENT, PRODUCTION, WEBPACK_STATS } from "../constants";
import { exists, resolveExternal, formatError } from "../utils";

const PLUGINS = {
  common: [
    "progress-bar",
    "no-errors",
    "loader-options",
    "define",
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
    "commons-chunk",
    "hashed-module-ids",
    "inline-manifest",
    "uglify-js",
    "imagemin",
    "offline"
  ]
}

export default class Webpack {
  constructor(options) {
    this.options = options;
  }

  init() {
    const LOADERS = [
      "static",
      Symbol.keyFor(this.options.lang),
      Symbol.keyFor(this.options.styles)
    ];

    const PLUGINS_ARRAY = PLUGINS.common
      .concat(PLUGINS[this.options.env] || PLUGINS[DEVELOPMENT])
      .concat(this.options.server ? PLUGINS.server : []);

    return Promise.all([
      this.loadConfig("./loaders", LOADERS),
      this.loadConfig("./plugins", PLUGINS_ARRAY)
    ])
      .then(this.loadBaseConfig.bind(this))
      .then(this.loadExternalConfig.bind(this))
      .then(this.initCompiler.bind(this))
      .catch(error => console.error(formatError("%s: %s"), error.name, error.message));
  }

  run() {
    this.init().then(compiler => compiler.run(logger));
  }

  watch(watchOptions) {
    this.init().then(compiler => compiler.watch(watchOptions, logger));
  }

  loadConfig(dir, moduleNames) {
    let modules = moduleNames.map(name => {
      let filename = path.resolve(__dirname, dir, name);
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
    return System.import("./base")
      .then(m => m.default(this.options, { loaders, plugins }));
  }

  loadExternalConfig(config) {
    const DEFAULT_CONFIG_FILES = ["webpack.config", "webpackfile"];

    const EXTNAMES = Object.keys(extensions).sort((a, b) => {
      return a == ".js" ? -1 : b == ".js" ? 1 : a.length - b.length;
    });

    let configFile;

    if (this.options.config) {
      let filename = resolveExternal(this.options.config);
      let extname = EXTNAMES.find(e => filename.endsWith(e)) || path.extname(filename);

      configFile = { filename, extname };
    } else {
      DEFAULT_CONFIG_FILES.some(basename => EXTNAMES.some(extname => {
        let filename = resolveExternal(basename + extname);

        if (exists(filename)) {
          configFile = { filename, extname };
          return true;
        }
      }));
    }

    if (!configFile) return config;

    return registerCompiler(extensions[configFile.extname])
      .then(() => System.import(configFile.filename))
      .then(externalConfig => {
        // Check, is external config file is ES6 module
        externalConfig = externalConfig && externalConfig.default || externalConfig;
        /**
         * Just like in the Webpack, external config can export function which
         * accepts options passed to CLI. When no options passed via CLI,
         * internal options object will be passed.
         */
        externalConfig = typeof externalConfig === "function" && externalConfig(this.options.options || this.options);

        if (!externalConfig || typeof externalConfig !== "object") {
          return Promise.reject(new Error("Config did not export an object or a function returning an object."));
        }

        return smartMerge(config, externalConfig);
      });
  }

  initCompiler(config) {
    this.config = config;
    this.compiler = webpack(this.config);
    return this.compiler;
  }
}

function registerCompiler(moduleDescriptor) {
  if (!moduleDescriptor) return Promise.resolve();

  if (typeof moduleDescriptor === "string") {
    return System.import(moduleDescriptor);
  } else if (!Array.isArray(moduleDescriptor)) {
    return System.import(moduleDescriptor.module)
      .then(m => { typeof m === "function" && moduleDescriptor.register(m) });
  } else {
    return new Promise((resolve, reject) => {
      if (!moduleDescriptor.length) return reject();

      registerCompiler(moduleDescriptor[0])
        .then(resolve)
        .catch(() => registerCompiler(moduleDescriptor.slice(1)).then(resolve));
    });
  }
}

function logger(error, stats) {
  console.log(stats.toString(WEBPACK_STATS));
}
