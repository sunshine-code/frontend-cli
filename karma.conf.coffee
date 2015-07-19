# Karma configuration
# Generated on Fri May 08 2015 18:19:57 GMT+0000 (UTC)

YAML   = require "yamljs"
config = YAML.load "config/build.yml"

config.browserify.bundleDelay = 30000

module.exports = (config) ->
  config.set

    # base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "#{__dirname}/app"


    # frameworks to use
    # available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["browserify", "jasmine"]


    # list of files / patterns to load in the browser
    files: [
      "**/*_test.coffee"
    ]


    # list of files to exclude
    exclude: [
    ]


    # preprocess matching files before serving them to the browser
    # available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.coffee": ["browserify"]
    }


    browserify: config.browserify


    watchify: config.watchify


    # test results reporter to use
    # possible values: "dots", "progress"
    # available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"]


    # web server port
    port: 9877


    # enable / disable colors in the output (reporters and logs)
    colors: true


    # level of logging
    # possible values:
    # - config.LOG_DISABLE
    # - config.LOG_ERROR
    # - config.LOG_WARN
    # - config.LOG_INFO
    # - config.LOG_DEBUG
    logLevel: config.LOG_INFO


    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: true


    # start these browsers
    # available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["PhantomJS"]


    # Continuous Integration mode
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: false
