RestangularConfig = (config, Restangular, Session, $location) ->
  Restangular.setBaseUrl config.api.base
  Restangular.addFullRequestInterceptor (element, operation, route, url, headers, params, httpConfig) ->
    token = Session.get "token"
    headers["Authorization"] = "Token token=\"#{token}\"" if token

    return {
      headers: headers,
      params: params,
      element: element,
      httpConfig: httpConfig
    }

  Restangular.setErrorInterceptor (response, deferred, responseHandler) ->
    if response.status == 401
      Session.destroy()
      $location.path "/login"

      deferred.reject()
      return false

    true

RestangularConfig.$inject = ["CONFIG", "Restangular", "Session", "$location"]

module.exports = RestangularConfig
