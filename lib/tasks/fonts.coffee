gulp   = require "gulp"
config = require "../helpers/config"

gulp.task "fonts", ->
  gulp.src(config.paths.fonts + "**/*")
    .pipe gulp.dest(config.paths.public_assets)
