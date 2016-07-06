require("./bootstrap");

const fs = require("fs");
const path = require("path");

// Go to the external directory
process.chdir(path.resolve(__dirname, "..", ".."));

// Dont run if package located outside node_modules folder and on earlier initialized apps
if (
  path.basename(path.resolve(__dirname, "..")) != "node_modules" ||
  fs.readdirSync(process.cwd()).includes("package.json")
) process.exit(0);

const utils = require("./lib/utils");
const config = utils.loadRC();
const { default: AppGenerator } = require(`./lib/generators/${config.framework}/app`);

new AppGenerator(config).generate();
