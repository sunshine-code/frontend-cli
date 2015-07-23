require "yaml"

config = YAML::load_file(File.expand_path("../application.yml", __FILE__))

sass_dir   = config["paths"]["stylesheets"]
images_dir = config["paths"]["images"]
fonts_dir  = config["paths"]["fonts"]

css_dir         =
javascripts_dir = config["paths"]["public_assets"]

http_stylesheets_path      =
http_images_path           =
http_generated_images_path =
http_javascripts_path      =
http_fonts_path            = config["paths"]["http_assets"]

asset_cache_buster :none
