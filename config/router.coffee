RouterConfig = ($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode(true)
  $routeProvider.otherwise(redirectTo:"/")

RouterConfig.$inject = ["$routeProvider", "$locationProvider"]

module.exports = RouterConfig
