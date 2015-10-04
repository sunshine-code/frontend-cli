Frontend
========

Scaffold for frontend app

Dependencies
------------

You need [Node](http://nodejs.org/download/) and [Ruby](http://www.ruby-lang.org/en/downloads/) installed.

Install
-------

Node modules:
``` sh
npm install
```

Ruby bundle:
``` sh
bundler install --path=vendor/bundle
```

Build
-----

Launch webserver and rebuild project on changes:
``` sh
npm run start:dev
```

Build project for production:
``` sh
npm run build
```

Also you can run any build task separately in desired environment, for example:
``` sh
npm run build -- stylesheets # Build stylesheets for production
npm run build -- stylesheets --dev # Build stylesheets in development mode
```

Run
---

Compiled assets could be served directly from `public` folder by any HTTP server ([nginx](http://nginx.org) for example). You can also run embedded webserver (not recommended for production):
```sh
npm run start
```

Testing
-------

Run tests once:
``` sh
npm test
```

Watch files and execute the tests whenever one of these files changes:
``` sh
npm run test:watch
```
