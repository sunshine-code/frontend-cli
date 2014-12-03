angular = require "angular"
pkg     = require "../../package"

sample = angular.module "#{pkg.name}.sample", []

sample.config require "./router"
sample.controller "SampleController", require "./sample_controller"

module.exports = sample
