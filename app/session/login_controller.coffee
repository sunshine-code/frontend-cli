class LoginController
  @$inject = ["$location", "Session"]

  constructor: (@$location, @Session) ->
    @$location.path "/" if @Session.get "token"

  authenticate: ->
    @Session.create(@login, @password)
      .success => @$location.path "/"
      .error => @login_form.$setValidity "unauthorized", false

module.exports = LoginController
