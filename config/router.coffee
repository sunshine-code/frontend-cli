ApplicationRouter = ($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode(true)
  $routeProvider.otherwise(redirectTo:'/')

ApplicationRouter.$inject = ["$routeProvider", "$locationProvider"]

module.exports = ApplicationRouter
