frontend-cli
============

Toolkit for rapid development of React and Angular 2 apps.

Setup
-----

1. Create the app folder

  ```sh
  mkdir app_name
  cd app_name
  ```

2. Optionally set app options in the `.frontendrc` file

3. Install frontend-cli locally

  ```sh
  npm install frontend-cli
  ```

  frontend-cli will create app base file structure after installing oneself.

Usage
-----

frontend-cli includes itself a scaffolding utility, bundler and development webserver which running by the `bin/fe` executable at the root of the app directory.

### Scaffolder

Generate new code:

```sh
bin/fe generate <scaffold> <name> [..options]
```

Remove earlier generated code:

```sh
bin/fe destroy <scaffold> <name>
```

#### Available scaffolds

##### Common

* `html` — index.html page template
* `stylelint` — stylelint config file

##### React

* `component`
* `route`
* `actions`
* `reducer`

### Bundler

Build an app:

```sh
bin/fe build [..options]
```

where the `options` are:

* `--environment` or `-e` — build for the desired enviromnent, choices are: `development`, `test` and `production`. Default is `development`. If omitted bundler will try to get this setting from `NODE_ENV` environment variable.
* `--watch` or `-w` — build in the watch mode.
* `--config` or `-c` — path to the Webpack config file options from which will override the internal config. If omitted bundler will try to load options from `webpack.config` and `Webpackfile` files in the root of the app directory.
* `--options` or `-o` — options object to pass to the external config if it is a function. Behaves just like the Webpack's CLI `--env` option.

### Development server

Run the development server which will watch your code and perform hot swapping on its changes:

```
bin/fe server [..options]
```

where the `options` are:

* `--port` or `-p` — set server port. Default is `3000`.
* `--bind` or `-b` — set host bind server to. Default is `localhost`.
* `--config` or `-c` — same as in the bundler.
* `--options` or `-o` — same as in the bundler.
