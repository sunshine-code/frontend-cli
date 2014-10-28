SampleRouter = ($routeProvider) ->
  $routeProvider
    .when "/", controller: "SampleController", templateUrl: "/sample/foo.html"
    .when "/bar", controller: "SampleController", templateUrl: "/sample/bar.html"

SampleRouter.$inject = ["$routeProvider"]

module.exports = SampleRouter
