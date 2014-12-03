angular = require "angular"
pkg     = require "../package"
config  = require "../config/application.yml"

require "angular-route"
require "angular-local-storage"
require "restangular"

require "./services"

require "./sample"
require "./session"

packageize = (m) -> [pkg.name, m].join "."

deps = ["ngRoute", "LocalStorageModule", "restangular"]
  .concat ["services"].map packageize
  .concat ["sample", "session"].map packageize

app = angular.module pkg.name, deps

app.constant "VERSION", pkg.version
app.constant "CONFIG", config

app.config require "../config/router"
app.config require "../config/storage"
app.run require "../config/restangular"

module.exports = app
