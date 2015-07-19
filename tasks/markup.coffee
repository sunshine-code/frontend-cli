gulp        = require "gulp"
gutil       = require "gulp-util"
YAML        = require "yamljs"
extend      = require("util")._extend
slm         = require "gulp-slm"
inject      = require "gulp-inject"
minify_html = require "gulp-minify-html"
gzip        = require "gulp-gzip"

pkg    = require "../package"
config = extend YAML.load("config/application.yml"),
                YAML.load("config/build.yml")

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

gulp.task "markup", ["javascripts", "stylesheets"], ->
  javascripts = config.paths.public_assets + "**/*.js"
  stylesheets = config.paths.public_assets + "**/*.css"
  assets      = gulp.src [javascripts, stylesheets], read: false
  templates   = gulp.src config.paths.app + "*/**/*.slm"

  gulp.src(config.paths.app + "*.slm")
    .pipe inject assets, ignorePath: config.paths.public
    .pipe inject templates, ignorePath: config.paths.app, transform: transform_template
    .pipe slm(locals: { package: pkg, config: config })
    .pipe if gutil.env.dev then gutil.noop() else minify_html(config.minify_html)
    .pipe gulp.dest(config.paths.public)
    .pipe if gutil.env.dev then gutil.noop() else gzip(config.gzip)
    .pipe if gutil.env.dev then gutil.noop() else gulp.dest(config.paths.public)
