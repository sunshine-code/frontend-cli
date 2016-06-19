import WebpackDevServer from "webpack-dev-server";

import { DEVELOPMENT, WEBPACK_STATS } from "./constants";
import Webpack from "./webpack";

export default class Server {
  constructor(options) {
    this.options = options;

    const WEBPACK_OPTIONS = {
      env: DEVELOPMENT,
      framework: this.options.framework,
      server: true,
      serverURL: `http://${this.options.binding}:${this.options.port}`
    };

    this.webpack = new Webpack(WEBPACK_OPTIONS);
    this.webpack.init().then(this.run.bind(this));
  }

  run(compiler) {
    const SERVER_OPTIONS = {
      publicPath: this.webpack.config.output.publicPath,
      hot: true,
      historyApiFallback: true,
      stats: Object.assign(WEBPACK_STATS, {
        hash: false,
        version: false,
      })
    };

    this.server = new WebpackDevServer(compiler, SERVER_OPTIONS);
    this.server.listen(this.options.port, this.options.binding, error => {
      if (error) return console.log(error);

      console.log(`Listening at http://${this.options.binding}:${this.options.port}/`);
    });
  }
}
