angular = require "angular"

class SampleController
  @$inject = ["Sample"]

  constructor: (Sample) ->
    angular.extend @, Sample

module.exports = SampleController
