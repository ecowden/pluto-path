# pluto-path

Create a Pluto dependency injection module from files in a path or paths.

## Usage

### Simplified Options

```js
var path = require('path');

requirePath(path.join(__dirname, 'my-directory')) // you can pass a single search path or array of them
  .then(function (plutoModule) {
    // Most of the time, you want to eagerly load all files.
    // Alternately, use the plutoModule as desired and lazily load specific components.
    plutoModule.eagerlyLoadAll();
  })
  // don't forget to handle errors!
  .catch(handleError);
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
var path = require('path');

requirePath({
    path: path.join(__dirname, 'my-directory'),
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js']
  })
  .then(function (plutoModule) {
    // Most of the time, you want to eagerly load all files.
    // Alternately, use the plutoModule as desired and lazily load specific components.
    plutoModule.eagerlyLoadAll();
  })
  // don't forget to handle errors!
  .catch(handleError);
```
