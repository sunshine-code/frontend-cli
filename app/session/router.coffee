SessionRouter = ($routeProvider) ->
  $routeProvider
    .when "/login",
      controller: "LoginController"
      controllerAs: "user"
      templateUrl: "/session/login.html"
    .when "/logout",
      resolve:
        logout: ["Session", (Session) -> Session.destroy()]
      redirectTo: "/"

SessionRouter.$inject = ["$routeProvider"]

module.exports = SessionRouter
