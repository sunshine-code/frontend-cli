gulp = require "gulp"
YAML = require "yamljs"

config = YAML.load "config/application.yml"

gulp.task "watch", ->
  gulp.watch config.paths.stylesheets + "**/*.scss", ["stylesheets"]
  gulp.watch config.paths.app + "**/*.slm", ["markup"]
  gulp.watch config.paths.images + "**/*", ["images"]
  gulp.watch config.paths.fonts + "**/*", ["fonts"]
