# pluto-path

Create and bootstreap an app using the [Pluto](https://github.com/ecowden/pluto.js) dependency injection package from files in a path or paths.

| Branch        | Status        |
| ------------- |:------------- |
| Master        | [![Build Status](https://travis-ci.org/ecowden/pluto-path.png?branch=master)](https://travis-ci.org/ecowden/pluto-path) [![Coverage Status](https://coveralls.io/repos/github/ecowden/pluto-path/badge.svg?branch=master)](https://coveralls.io/github/ecowden/pluto-path?branch=master) [![NSP Status](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930/badge)](https://nodesecurity.io/orgs/ecowden/projects/5cff7ae1-a34a-49f7-bf18-f2b816180930) |
| All           | [![Build Status](https://travis-ci.org/ecowden/pluto-path.png)](https://travis-ci.org/ecowden/pluto-path) |

## Usage

### Simplified Options

```js
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
const path = require('path')
const plutoPath = require('pluto-path')

plutoPath({
    path: path.join(__dirname, 'my-directory'),
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js']
  })
  .then(function (app) {
    // `app` holds the result of calling pluto's `.bootstrap()`
    // function. In this case, that's a Map from filenames to their
    // components.
  })
  // don't forget to handle errors!
  .catch(handleError)
```
