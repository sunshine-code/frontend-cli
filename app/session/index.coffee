angular = require "angular"
pkg     = require "../../package"

session = angular.module "#{pkg.name}.session", []

session.config require "./router"
session.controller "LoginController", require "./login_controller"

module.exports = session
