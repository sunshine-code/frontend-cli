#!/usr/bin/env node

require("./bootstrap");

const WORKING_DIR = process.cwd();

let fs = require("fs");

if (
  /frontend-cli/.test(WORKING_DIR) ||
  fs.readdirSync(WORKING_DIR).includes("app")
) process.exit(0);

let utils = require("./lib/utils");
let config = utils.loadRC();
let { default: AppGenerator } = require(`./lib/generators/${config.framework}/app`);

new AppGenerator(config).generate();
