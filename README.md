Frontend
========

Scaffold for frontend app

Dependencies
------------

You need [Node](http://nodejs.org/download/) and [Ruby](http://www.ruby-lang.org/en/downloads/) installed.

Install
-------

Node global packages:
``` sh
npm install -g gulp coffee-script
```

Node local packages:
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
gulp --dev
```

Build project for production:
``` sh
gulp
```
