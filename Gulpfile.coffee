gulp         = require "gulp"
gutil        = require "gulp-util"
YAML         = require "yamljs"
source       = require "vinyl-source-stream"
buffer       = require "vinyl-buffer"
extend       = require("util")._extend
browserify   = require "browserify"
watchify     = require "watchify"
uglify       = require "gulp-uglify"
sass         = require "gulp-ruby-sass"
autoprefixer = require "gulp-autoprefixer"
csscomb      = require "gulp-csscomb"
csso         = require "gulp-csso"
slm          = require "gulp-slm"
inject       = require "gulp-inject"
minify_html  = require "gulp-minify-html"
imagemin     = require "gulp-imagemin"
pngquant     = require "imagemin-pngquant"
webserver    = require "gulp-webserver"

pkg     = require "./package"
config  = YAML.load "config/application.yml"
gconfig = YAML.load "config/gulp.yml"

gulp.task "javascripts", ->
  options = extend(watchify.args, gconfig.browserify)
  bundler = browserify("./" + config.filenames.src_javascript, options)
  bundle = ->
    bundler.bundle()
      .on "error", -> gutil.log "Browserify Error"
      .pipe source(config.filenames.dest_javascript)
      .pipe buffer()
      .pipe if gutil.env.dev then gutil.noop() else uglify(gconfig.uglify)
      .pipe gulp.dest(config.paths.public_assets)
      .on "end", -> gutil.log "Succesfully bundled"

  if gutil.env.dev
    bundler = watchify bundler
    bundler.on "update", bundle

  bundle()

gulp.task "stylesheets", ->
  gulp.src(config.paths.stylesheets + config.filenames.src_stylesheet)
    .pipe sass(gconfig.sass)
    .on "error", (err) -> gutil.log err.message
    .pipe autoprefixer(gconfig.autoprefixer)
    .pipe if gutil.env.dev then csscomb(gconfig.csscomb) else gutil.noop()
    .pipe if gutil.env.dev then gutil.noop() else csso(gconfig.csso_disable_struct_min)
    .pipe gulp.dest(config.paths.public_assets)

gulp.task "markup", ->
  javascripts = config.paths.public_assets + "**/*.js"
  stylesheets = config.paths.public_assets + "**/*.css"
  assets      = gulp.src [javascripts, stylesheets], read: false
  templates   = gulp.src config.paths.app + "**/*.slm"

  transform_template = (filepath, file) ->
    id = filepath.replace(/slm$/, "html")
    contents = file.contents.toString("utf8")
      .replace(/\r?\n?$/, "")
      .split(/\r?\n/g)
      .join("\n  ")

    """
    script type="text/ng-template" id="#{id}"
      #{contents}
    """

  gulp.src(config.paths.app + "*.slm")
    .pipe inject assets, ignorePath: config.paths.public
    .pipe inject templates, ignorePath: config.paths.app, transform: transform_template
    .pipe slm(locals: { package: pkg, config: config })
    .pipe if gutil.env.dev then gutil.noop() else minify_html(gconfig.minify_html)
    .pipe gulp.dest(config.paths.public)

gulp.task "images", ->
  gulp.src(config.paths.images + "**/*")
    .pipe imagemin(extend gconfig.imagemin, use: [pngquant()])
    .pipe gulp.dest(config.paths.public_assets)

gulp.task "fonts", ->
  gulp.src(config.paths.fonts + "**/*")
    .pipe gulp.dest(config.paths.public_assets)

gulp.task "webserver", ->
  gulp.src("./public")
    .pipe webserver fallback: "index.html", livereload: true

gulp.task "watch", ->
  gulp.watch config.paths.stylesheets + "**/*.scss", ["stylesheets"]
  gulp.watch config.paths.app + "**/*.slm", ["markup"]
  gulp.watch config.paths.images + "**/*", ["images"]
  gulp.watch config.paths.fonts + "**/*", ["fonts"]

default_tasks = ["javascripts", "stylesheets", "markup", "images", "fonts"]
default_tasks.push "webserver", "watch" if gutil.env.dev

gulp.task "default", default_tasks
