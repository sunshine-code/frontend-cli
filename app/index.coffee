angular = require "angular"
pkg     = require "../package"
config  = require "../config/application.yml"

app = angular.module pkg.name, [
  require("angular-route"),
  require("angular-local-storage") && "LocalStorageModule",
  require("restangular") && "restangular",
  require("./shared"),
  require("./main"),
  require("./session")
]

app.constant "VERSION", pkg.version
app.constant "CONFIG", config

app.config require "../config/router"
app.config require "../config/storage"
app.run require "../config/restangular"

module.exports = app
