gulp       = require "gulp"
gutil      = require "gulp-util"
YAML       = require "yamljs"
source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"
extend     = require("util")._extend
browserify = require "browserify"
watchify   = require "watchify"
uglify     = require "gulp-uglify"
gzip       = require "gulp-gzip"

config = extend YAML.load("config/application.yml"),
                YAML.load("config/build.yml")

gulp.task "javascripts", ->
  options = extend(watchify.args, config.browserify)
  bundler = browserify("./#{config.filenames.src_javascript}", options)
  bundle = ->
    bundler.bundle()
    .on "error", (err) -> gutil.log "Browserify error:", err.message
    .pipe source(config.filenames.dest_javascript)
    .pipe buffer()
    .pipe if gutil.env.dev then gutil.noop() else uglify(config.uglify)
    .pipe gulp.dest(config.paths.public_assets)
    .pipe if gutil.env.dev then gutil.noop() else gzip(config.gzip)
    .pipe if gutil.env.dev then gutil.noop() else gulp.dest(config.paths.public_assets)

  if gutil.env.dev
    bundler = watchify(bundler, config.watchify)
    bundler.on "update", (files) ->
      gutil.log "Changed", files.join(", ")
      bundle()
    bundler.on "log", gutil.log

  bundle()
