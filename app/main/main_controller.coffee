angular = require "angular"

class MainController
  @$inject = ["Sample"]

  constructor: (Sample) ->
    angular.extend @, Sample

module.exports = MainController
