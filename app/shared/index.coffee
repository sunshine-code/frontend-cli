angular = require "angular"
pkg     = require "../../package"

module.exports = module_name = "#{pkg.name}.shared"
shared = angular.module module_name, []

# TODO: put services into separate module
shared.service "Session", require "./services/session"
