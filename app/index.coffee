angular = require "angular"
pkg     = require "../package"

require "angular-route"
require "./modules/sample"

app = angular.module pkg.name, ["ngRoute", "sample"]
app.constant "VERSION", pkg.version
app.config require "../config/router"

module.exports = app
