MainRouter = ($routeProvider) ->
  $routeProvider
    .when "/",
      controller: "MainController"
      controllerAs: "sample"
      templateUrl: "/main/show.html"
      resolve:
        Sample: ["Restangular", (Restangular) -> Restangular.one("users", 1).get()]

MainRouter.$inject = ["$routeProvider"]

module.exports = MainRouter
