gulp        = require "gulp"
gutil       = require "gulp-util"
require_dir = require "require-dir"

tasks = require_dir "./lib/tasks"

default_tasks = ["javascripts", "test", "stylesheets", "markup", "images", "fonts"]
default_tasks.push "webserver", "watch" if gutil.env.dev

gulp.task "default", default_tasks
