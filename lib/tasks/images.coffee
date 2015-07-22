gulp         = require "gulp"
extend       = require("util")._extend
imagemin     = require "gulp-imagemin"
pngquant     = require "imagemin-pngquant"
config       = require "../helpers/config"

gulp.task "images", ->
  gulp.src(config.paths.images + "**/*")
    .pipe imagemin(extend config.imagemin, use: [pngquant()])
    .pipe gulp.dest(config.paths.public_assets)
