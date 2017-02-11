# pluto-path

Create and bootstrap an app from files in a path or paths using the [Pluto](https://github.com/ecowden/pluto.js) dependency injection package.

For instance, if you're getting tired of needing to `require(...)` each new route file in your Express/Hapi/etc. app, use `pluto-path` to automatically load files from a given path.

| Branch        | Status        |
| ------------- |:------------- |
| Master        | [![Build Status](https://travis-ci.org/ecowden/pluto-path.png?branch=master)](https://travis-ci.org/ecowden/pluto-path) [![Coverage Status](https://coveralls.io/repos/github/ecowden/pluto-path/badge.svg?branch=master)](https://coveralls.io/github/ecowden/pluto-path?branch=master) [![NSP Status](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930/badge)](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930) |
| All           | [![Build Status](https://travis-ci.org/ecowden/pluto-path.png)](https://travis-ci.org/ecowden/pluto-path) |

## Usage

### Simplified Options

```js
'use strict'

const path = require('path')
const plutoPath = require('pluto-path')

plutoPath(path.join(__dirname, 'my-directory')) // you can pass a single search path or array of them
  .then(function (app) {
    // `app` holds the result of calling pluto's `.bootstrap()`
    // function. In this case, that's a Map from filenames to their
    // components.
  })
  // don't forget to handle errors!
  .catch(handleError)
```

### Binding Types

This module will instantiate components in different ways:

| Binding          | Used When | Meaning |
| ---------------- | --------- | ------- |
| Factory Function | File exports a `function`, and starts with a lower-case letter. | The module's export will be called as a regular function, and the result will be bound to the file name. |
| Constructor      | File exports a `function`, and starts with a capital letter | The module's export will be bound as a constructor with `new`, and the result will be bound to the file name. |
| Instance         | File does not export a `function` | The module's export will be used as-is. |

See the [Pluto Documentation](https://github.com/ecowden/pluto.js) for more details.

### Full Options

Since the default include and exclude options work for most projects and the path is often the only meaningful property, you can pass a `string` or `array` of strings for the path property instead of a full options object, as above. Alternately

| Property | Description |
| -------- | ----------- |
| path     | _string_ or _array_ of absolute paths to search for files. Default: `.`. |
| include  | _string_ or _array_ of [minimatch](https://github.com/isaacs/minimatch) patterns. A file in the path(s) that match at least one pattern will be `require(...)`'d unless the file also matches an exclusion pattern. Default: `['**/*.js', '**/*.json']`.|
| exclude  | _string_ or _array_ of [minimatch](https://github.com/isaacs/minimatch) patterns. Files in the path(s) that match at least one pattern will be excluded. Default: `['**/*Spec.js']`. |
| extraBindings | A function given the standard pluto `bind` object. Use when
you'd like to specify additional options beyond what pluto-path can find on the
filesystem. |

```js
'use strict'

const path = require('path')
const plutoPath = require('pluto-path')

plutoPath({
    path: path.join(__dirname, 'my-directory'),
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js'],
    extraBindings: (bind) => {
      bind('meaningOfLife').toInstance(42)
    }
  })
  .then(function (app) {
    // `app` holds the result of calling pluto's `.bootstrap()`
    // function. In this case, that's a Map from filenames to their
    // components.
  })
  // don't forget to handle errors!
  .catch(handleError)
```

## Humble Opinionated Recommendations

### Project Organization

There's usually two different kinds of files in an app:

1. Long-lived components, like route handlers and server configuration. These need to be run exactly once and become a part of your app. Place these in an `app` folder.
1. Utilities and such that don't have a life of their own, and which you don't want subject to dependency injection. Place these in a `lib` folder.

```
/
  /app        Bootstrap long-lived components
  /lib        Utilities and such you don't want to dependency-inject
  index.js    `main` file with initial bootstrapping
```

Instruct `pluto-path` to bootstrap the `app` folder and leave the `lib` folder alone. If you're not doing any fancy startup stuff and you're fine with other defaults, your `index.js` file might look like:

```js
'use strict'

const path = require('path')
const plutoPath = require('pluto-path')

plutoPath(path.join(__dirname, 'app'))
```

### Tests

You might notice that there's not test path, event though one of the main motivations for dependency injection is testability. Rather than use a separate `test` tree, I like to put my tests right next to the thing they're testing, with a `Spec` suffix, like:

```
/
  /app
    myThing.js
    myThingSpec.js
```

I am highly influenced by Uncle Bob's [Principles of Object Oriented Design](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod). In this case:

* **Common Closure Principle**: Things that change together should be packaged together.

When it comes to unit testing, a test and the thing it tests unsurprisingly tend to change together, so I like to put them next to each other. Stepping back, this makes logical sense, too: why hunt deep down through two separate directory trees just to get to the two files you want to change? Putting tests next to the code they test reduces friction when writing tests and just makes life easier.

The default arguments to `pluto-path` assume this kind of organization. If you want to do something else, change the `include` and `exclude` options as you see fit.
