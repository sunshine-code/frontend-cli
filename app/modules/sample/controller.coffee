class SampleController
  @$inject = ["$scope"]

  constructor: (@$scope) ->
    @$scope.foo = "bar"
    @$scope.bar = "foo"

module.exports = SampleController
