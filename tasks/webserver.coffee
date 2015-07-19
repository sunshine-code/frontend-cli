gulp      = require "gulp"
YAML      = require "yamljs"
webserver = require "gulp-webserver"

config = YAML.load "config/build.yml"

gulp.task "webserver", ->
  gulp.src("./public")
    .pipe webserver(config.webserver)
