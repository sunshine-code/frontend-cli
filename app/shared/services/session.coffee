class Session
  @$inject = ["CONFIG", "$http", "localStorageService"]

  constructor: (@config, @$http, @storage) ->

  get: (prop) ->
    session = @storage.get "session"
    session && session[prop] || session

  create: (login, password) ->
    data =
      login: login
      password: password

    @$http.post "#{@config.api.base}/login", data
      .success (data) => @storage.set "session", data

  destroy: -> @storage.remove "session"

module.exports = Session
