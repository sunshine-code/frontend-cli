#!/usr/bin/env node

require("./bootstrap");

const fs = require("fs");
const path = require("path");

// Return to external directory
process.chdir(path.resolve(__dirname, "..", ".."));

if (fs.readdirSync(process.cwd()).includes("app")) process.exit(0);

const utils = require("./lib/utils");
const config = utils.loadRC();
const { default: AppGenerator } = require(`./lib/generators/${config.framework}/app`);

new AppGenerator(config).generate();
