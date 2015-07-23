gulp         = require "gulp"
gutil        = require "gulp-util"
extend       = require("util")._extend
sass         = require "gulp-ruby-sass"
autoprefixer = require "gulp-autoprefixer"
sourcemaps   = require "gulp-sourcemaps"
csscomb      = require "gulp-csscomb"
csso         = require "gulp-csso"
gzip         = require "gulp-gzip"
config       = require "../helpers/config"

gulp.task "stylesheets", ->
  src = config.paths.stylesheets + config.filenames.src_stylesheet
  config.sass.sourcemap = true if gutil.env.dev

  sass(src, config.sass)
    .on "error", (err) -> gutil.log err.message
    .pipe autoprefixer(config.autoprefixer)
    .pipe csscomb("config/csscomb.json")
    .pipe if gutil.env.dev then gutil.noop() else csso(config.csso_disable_struct_min)
    .pipe(sourcemaps.write())
    .pipe gulp.dest(config.paths.public_assets)
    .pipe if gutil.env.dev then gutil.noop() else gzip(config.gzip)
    .pipe if gutil.env.dev then gutil.noop() else gulp.dest(config.paths.public_assets)
