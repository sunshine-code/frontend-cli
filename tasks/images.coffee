gulp         = require "gulp"
YAML         = require "yamljs"
extend       = require("util")._extend
imagemin     = require "gulp-imagemin"
pngquant     = require "imagemin-pngquant"

config = extend YAML.load("config/application.yml"),
                YAML.load("config/build.yml")

gulp.task "images", ->
  gulp.src(config.paths.images + "**/*")
    .pipe imagemin(extend config.imagemin, use: [pngquant()])
    .pipe gulp.dest(config.paths.public_assets)
