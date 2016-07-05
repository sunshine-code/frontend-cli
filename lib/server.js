import WebpackDevServer from "webpack-dev-server";

import { DEVELOPMENT } from "./constants";
import { formatError, formatHighlight } from "./utils";
import Bundler from "./bundler";
import { WEBPACK_STATS } from "./bundler/support";

export default class Server {
  constructor(options) {
    this.options = options;

    const WEBPACK_OPTIONS = Object.assign({}, this.options, {
      env: DEVELOPMENT,
      server: true,
      serverURL: `http://${this.options.binding}:${this.options.port}`
    });

    this.bundler = new Bundler(WEBPACK_OPTIONS);
    this.bundler.init().then(this.run.bind(this));
  }

  run(compiler) {
    const SERVER_OPTIONS = {
      publicPath: this.bundler.config.output.publicPath,
      hot: true,
      historyApiFallback: true,
      stats: Object.assign({}, WEBPACK_STATS, {
        hash: false,
        version: false,
      })
    };

    this.server = new WebpackDevServer(compiler, SERVER_OPTIONS);
    this.server.listen(this.options.port, this.options.binding, error => {
      if (error) return console.error(formatError(error));

      const SERVER_URL = `http://${this.options.binding}:${this.options.port}/`;
      console.log(`Listening at ${formatHighlight(SERVER_URL)}`);
    });
  }
}
