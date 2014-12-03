pkg = require "../package"

StorageConfig = (localStorageServiceProvider) ->
  localStorageServiceProvider
    .setPrefix pkg.name

StorageConfig.$inject = ["localStorageServiceProvider"]

module.exports = StorageConfig
