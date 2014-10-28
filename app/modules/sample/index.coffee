require "angular"

sample = angular.module "sample", []

sample.config require "./router"
sample.controller "SampleController", require "./controller"

module.exports = sample
