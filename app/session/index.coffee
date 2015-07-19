angular = require "angular"
pkg     = require "../../package"

module.exports = module_name = "#{pkg.name}.session"
session = angular.module module_name, []

session.config require "./router"
session.controller "LoginController", require "./login_controller"
