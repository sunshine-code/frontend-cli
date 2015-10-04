extend = require("util")._extend
path   = require "path"
YAML   = require "yamljs"

project_root = path.resolve(__dirname, "..", "..")

module.exports = extend YAML.load("#{project_root}/config/application.yml"),
                        YAML.load("#{project_root}/config/build.yml")
