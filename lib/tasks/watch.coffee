gulp   = require "gulp"
config = require "../helpers/config"

gulp.task "watch", ->
  gulp.watch config.paths.stylesheets + "**/*.scss", ["stylesheets"]
  gulp.watch config.paths.app + "**/*.slm", ["markup"]
  gulp.watch config.paths.images + "**/*", ["images"]
  gulp.watch config.paths.fonts + "**/*", ["fonts"]
