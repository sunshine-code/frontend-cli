gulp      = require "gulp"
webserver = require "gulp-webserver"
config    = require "../helpers/config"

gulp.task "webserver", ->
  gulp.src("./public")
    .pipe webserver(config.webserver)
