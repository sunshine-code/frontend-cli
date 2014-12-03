SampleRouter = ($routeProvider) ->
  $routeProvider
    .when "/",
      controller: "SampleController"
      controllerAs: "sample"
      templateUrl: "/sample/show.html"
      resolve:
        Sample: ["Restangular", (Restangular) -> Restangular.one("users", 1).get()]

SampleRouter.$inject = ["$routeProvider"]

module.exports = SampleRouter
