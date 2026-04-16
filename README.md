# BSON

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

BSON is short for "Binary JSON," and is the binary-encoded serialization of JSON-like documents. You can learn more about it in [the specification](http://bsonspec.org).

```js
import { BSON } from "https://code4fukui.github.io/BSON/BSON.js";

const object = {
  nil: null,
  integer: 1,
  float: Math.PI,
  string: "Hello, world!",
  binary: Uint8Array.from([1, 2, 3]),
  array: [10, 20, 30],
  map: { foo: "bar" },
  timestampExt: new Date(),
};

const encoded = BSON.encode(object);
console.log(encoded);

const obj = BSON.decode(encoded);
console.log(obj);
```

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [MongoDB Node.js Driver Version Compatibility](#mongodb-nodejs-driver-version-compatibility)
- [Documentation](#documentation)
- [Bugs/Feature Requests](#bugs--feature-requests)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install bson
```

## Usage

### Node.js or Bundling Usage

When using a bundler or Node.js you can import bson using the package name:

```js
import { BSON, EJSON, ObjectId } from 'bson';
// or:
// const { BSON, EJSON, ObjectId } = require('bson');

const bytes = BSON.serialize({ _id: new ObjectId() });
console.log(bytes);
const doc = BSON.deserialize(bytes);
console.log(EJSON.stringify(doc));
// {"_id":{"$oid":"..."}}
```

### Browser Usage

If you are working directly in the browser without a bundler please use the `.mjs` bundle like so:

```html
<script type="module">
  import { BSON, EJSON, ObjectId } from './lib/bson.mjs';

  const bytes = BSON.serialize({ _id: new ObjectId() });
  console.log(bytes);
  const doc = BSON.deserialize(bytes);
  console.log(EJSON.stringify(doc));
  // {"_id":{"$oid":"..."}}
</script>
```

### Webpack Usage

To use BSON with webpack, you need to add a fallback for the `crypto` module in your webpack configuration:

```js
// webpack.config.js
module.exports = {
  // ... other configurations
  resolve: {
    fallback: { crypto: false }
  }
};
```

## MongoDB Node.js Driver Version Compatibility

Only the following version combinations with the [MongoDB Node.js Driver](https://github.com/mongodb/node-mongodb-native) are considered stable.

|               | `bson@1.x` | `bson@4.x` | `bson@5.x` | `bson@6.x` | `bson@7.x` |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| `mongodb@7.x` | N/A        | N/A        | N/A        | N/A        | ✓          |
| `mongodb@6.x` | N/A        | N/A        | N/A        | ✓          | N/A        |
| `mongodb@5.x` | N/A        | N/A        | ✓          | N/A        | N/A        |
| `mongodb@4.x` | N/A        | ✓          | N/A        | N/A        | N/A        |
| `mongodb@3.x` | ✓          | N/A        | N/A        | N/A        | N/A        |

## Documentation

### BSON

[API documentation](https://mongodb.github.io/node-mongodb-native/Next/modules/BSON.html)

<a name="EJSON"></a>

### EJSON

- [EJSON](#EJSON)
  - [.parse(text, [options])](#EJSON.parse)
  - [.stringify(value, [replacer], [space], [options])](#EJSON.stringify)
  - [.serialize(bson, [options])](#EJSON.serialize)
  - [.deserialize(ejson, [options])](#EJSON.deserialize)

<a name="EJSON.parse"></a>

#### _EJSON_.parse(text, [options])

| Param             | Type                 | Default           | Description                                                                        |
| ----------------- | -------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| text              | `string`             |                   |                                                                                    |
| [options]         | `object`             |                   | Optional settings                                                                  |
| [options.relaxed] | `boolean`            | `true`            | Attempt to return native JS types where possible, rather than BSON types (if true) |

Parse an Extended JSON string, constructing the JavaScript value or object described by that string.

**Example**

```js
const { EJSON } = require('bson');
const text = '{ "int32": { "$numberInt": "10" } }';

// prints { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } }
console.log(EJSON.parse(text, { relaxed: false }));

// prints { int32: 10 }
console.log(EJSON.parse(text));
```

<a name="EJSON.stringify"></a>

#### _EJSON_.stringify(value, [replacer], [space], [options])

| Param      | Type                                        | Default | Description                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | `object`                                    |         | The value to convert to extended JSON                                                                                                                                                                                                                                                                                                              |
| [replacer] | `function` \| `array`                       |         | A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting/filtering the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string |
| [space]    | `string` \| `number`                        |         | A String or Number object that's used to insert white space into the output JSON string for readability purposes.                                                                                                                                                                                                                                  |

## Bugs / Feature Requests

Think you've found a bug? Want to see a new feature in `bson`? Please open a case in our issue management tool, JIRA:

1. Create an account and login: [jira.mongodb.org](https://jira.mongodb.org)
2. Navigate to the NODE project: [jira.mongodb.org/browse/NODE](https://jira.mongodb.org/browse/NODE)
3. Click **Create Issue** - Please provide as much information as possible about the issue and how to reproduce it.

Bug reports in JIRA for the NODE driver project are **public**.

## Contributing

### Building

To build a new version, perform the following operations:

```bash
npm install
npm run build
```

### Testing and Linting

To run the test suite:

```bash
npm test
```

You can also run tests for Node.js and web environments separately:

```bash
npm run check:node
npm run check:web
```

To check for linting issues:

```bash
npm run check:lint
```

To automatically fix formatting issues:

```bash
npm run format
```

### Benchmarks

This project includes a benchmark suite. For instructions on how to write and run your own benchmarks, please see the [custom benchmarks README](./test/bench/custom/readme.md).

## License

Apache-2.0 License — see [LICENSE](LICENSE).