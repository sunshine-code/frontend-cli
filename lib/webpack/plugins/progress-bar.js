import ProgressBarPlugin from "progress-bar-webpack-plugin";
import chalk from "chalk";

export default (options) => {
  if (options.server) return;

  return new ProgressBarPlugin({
    format: `${chalk.yellow.bold("build")} ${chalk.white.bold("[")}:bar${chalk.white.bold("]")} ${chalk.green.bold(":percent")} ${chalk.white(":msg")}`,
    width: 50,
    summary: false
  });
}
