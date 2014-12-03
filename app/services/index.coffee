angular = require "angular"
pkg     = require "../../package"

services = angular.module "#{pkg.name}.services", []

services.service "Session", require "./session"

module.exports = services
