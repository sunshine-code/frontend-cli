gulp         = require "gulp"
gutil        = require "gulp-util"
YAML         = require "yamljs"
extend       = require("util")._extend
sass         = require "gulp-ruby-sass"
autoprefixer = require "gulp-autoprefixer"
csscomb      = require "gulp-csscomb"
csso         = require "gulp-csso"
gzip         = require "gulp-gzip"

config = extend YAML.load("config/application.yml"),
                YAML.load("config/build.yml")

gulp.task "stylesheets", ->
  gulp.src(config.paths.stylesheets + config.filenames.src_stylesheet)
    .pipe sass(config.sass)
    .on "error", (err) -> gutil.log err.message
    .pipe autoprefixer(config.autoprefixer)
    .pipe if gutil.env.dev then csscomb(config.csscomb) else gutil.noop()
    .pipe if gutil.env.dev then gutil.noop() else csso(config.csso_disable_struct_min)
    .pipe gulp.dest(config.paths.public_assets)
    .pipe if gutil.env.dev then gutil.noop() else gzip(config.gzip)
    .pipe if gutil.env.dev then gutil.noop() else gulp.dest(config.paths.public_assets)
