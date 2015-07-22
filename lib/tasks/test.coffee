gulp  = require "gulp"
gutil = require "gulp-util"
path  = require "path"
karma = require("karma").server

gulp.task "test", (done) ->
  project_root = path.resolve(__dirname, "..", "..")
  options =
    configFile: "#{project_root}/config/karma.conf.coffee",
    colors: false

  options.singleRun = true unless gutil.env.dev

  karma.start(options, done)
