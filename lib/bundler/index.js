import webpack from "webpack";
import path from "path";
import { extensions } from "interpret";
import { smart as smartMerge } from "webpack-merge";

import { DEVELOPMENT, PRODUCTION, SCSS } from "../constants";
import { exists, resolveExternal, formatError } from "../utils";
import { registerCompiler, logger } from "./support";

const PLUGINS = {
  common: [
    "ProgressBar",
    "NoErrors",
    "LoaderOptions",
    "Define",
    "NpmInstall",
    "ExtractText",
    "Html",
    "Favicons"
  ],
  server: [
    "HotModuleReplacement"
  ],
  [DEVELOPMENT]: [
    "Visualizer"
  ],
  [PRODUCTION]: [
    "Clean",
    "Dedupe",
    "CommonsChunk",
    "HashedModuleIds",
    "InlineManifest",
    "UglifyJs",
    "Imagemin",
    "Offline"
  ]
};

const LOADERS = [
  "static"
];

export default class Bundler {
  constructor(options) {
    this.options = options;

    this.plugins = [
      ...PLUGINS.common,
      ...(PLUGINS[options.env] || PLUGINS[DEVELOPMENT]),
      ...(options.server ? PLUGINS.server : [])
    ];

    this.loaders = [
      ...LOADERS,
      Symbol.keyFor(options.lang),
      Symbol.keyFor(options.styles || SCSS)
    ];
  }

  run() {
    this.init().then(compiler => compiler.run(logger));
  }

  watch(watchOptions) {
    this.init().then(compiler => compiler.watch(watchOptions, logger));
  }

  async init() {
    try {
      const internalConfig = await this.loadInternalConfig();
      const externalConfig = await this.loadExternalConfig();

      this.config = smartMerge(internalConfig, externalConfig || {});
      this.compiler = webpack(this.config);

      return this.compiler;
    } catch (error) {
      console.error(formatError(error));
    }
  }

  async loadInternalConfig(loaders, plugins) {
    const [pluginsConfig, loadersConfig, { default: baseConfig }] = await Promise.all([
      this.loadConfigPartials("./plugins", this.plugins),
      this.loadConfigPartials("./loaders", this.loaders),
      System.import("./base")
    ]);

    return baseConfig(this.options, { pluginsConfig, loadersConfig });
  }

  async loadConfigPartials(dir, partialModules) {
    let configPartials = [];
    let partials = await Promise.all(
      partialModules.map(name => System.import(path.join(__dirname, dir, name)))
    );

    for (let { default: partial } of partials) {
      let configPartial = await partial(this.options);
      if (configPartial) configPartials = configPartials.concat(configPartial);
    }

    return configPartials;
  }

  async loadExternalConfig() {
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

    if (!configFile) return;

    await registerCompiler(extensions[configFile.extname]);

    let externalConfig = await System.import(configFile.filename);
    // Check, is external config file is ES6 module
    externalConfig = externalConfig && externalConfig.default || externalConfig;
    /**
     * Just like in the Webpack, external config can export function which
     * accepts options passed to CLI. When no options passed via CLI,
     * internal options object will be passed.
     */
    externalConfig = typeof externalConfig === "function" && externalConfig(this.options.options || this.options);

    if (!externalConfig || typeof externalConfig !== "object") {
      throw new Error("Config did not export an object or a function returning an object.");
    }

    return externalConfig;
  }
}
