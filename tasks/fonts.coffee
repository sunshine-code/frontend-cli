gulp = require "gulp"
YAML = require "yamljs"

config = YAML.load "config/application.yml"

gulp.task "fonts", ->
  gulp.src(config.paths.fonts + "**/*")
    .pipe gulp.dest(config.paths.public_assets)
