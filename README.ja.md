# BSON

> 英語版のREADMEはこちら: [README.md](README.md)

BSONは "Binary JSON" の略で、JSONライクなドキュメントのバイナリエンコーディングです。
詳細は[仕様](http://bsonspec.org)をご覧ください。

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

### 目次

- [必要環境](#必要環境)
- [インストール](#インストール)
- [使い方](#使い方)
- [MongoDB Node.jsドライバのバージョン互換性](#mongodb-nodejsドライバのバージョン互換性)
- [ドキュメンテーション](#ドキュメンテーション)
- [バグ・機能リクエスト](#バグ機能リクエスト)
- [FAQ](#faq)
- [ライセンス](#ライセンス)

### 必要環境
- Node.js >=20.19.0

### インストール

```sh
npm install bson
```

### 使い方

新しいバージョンをビルドするには以下の操作を行います:

```
npm install
npm run build
```

#### Node.jsまたはバンドラでの利用

Node.jsやWebpackのようなバンドラを使う場合は、パッケージ名からBSONをインポートできます:

```js
import { BSON, EJSON, ObjectId } from 'bson';
// または:
// const { BSON, EJSON, ObjectId } = require('bson');

const bytes = BSON.serialize({ _id: new ObjectId() });
console.log(bytes);
const doc = BSON.deserialize(bytes);
console.log(EJSON.stringify(doc));
// {"_id":{"$oid":"..."}}
```

#### ブラウザでの利用

バンドラなしでブラウザで直接使う場合は `.mjs` バンドルを使ってください:

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

### MongoDB Node.jsドライバのバージョン互換性

以下のバージョンの組み合わせのみが[MongoDB Node.jsドライバ](https://github.com/mongodb/node-mongodb-native)と安定して動作することが保証されています。

|               | `bson@1.x` | `bson@4.x` | `bson@5.x` | `bson@6.x` | `bson@7.x` |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| `mongodb@7.x` | N/A        | N/A        | N/A        | N/A        | ✓          |
| `mongodb@6.x` | N/A        | N/A        | N/A        | ✓          | N/A        |
| `mongodb@5.x` | N/A        | N/A        | ✓          | N/A        | N/A        |
| `mongodb@4.x` | N/A        | ✓          | N/A        | N/A        | N/A        |
| `mongodb@3.x` | ✓          | N/A        | N/A        | N/A        | N/A        |

### ドキュメンテーション

#### BSON
[APIドキュメンテーション](https://mongodb.github.io/node-mongodb-native/Next/modules/BSON.html)

<a name="EJSON"></a>

#### EJSON

- [EJSON](#EJSON)
  - [.parse(text, [options])](#EJSON.parse)
  - [.stringify(value, [replacer], [space], [options])](#EJSON.stringify)
  - [.serialize(bson, [options])](#EJSON.serialize)
  - [.deserialize(ejson, [options])](#EJSON.deserialize)

<a name="EJSON.parse"></a>

##### _EJSON_.parse(text, [options])

| パラメータ        | 型                   | デフォルト        | 説明                                                                       |
| ----------------- | -------------------- | ----------------- | -------------------------------------------------------------------------- |
| text              | `string`             |                   | パースする拡張JSON文字列。                                                 |
| [options]         | `object`             |                   | オプション設定。                                                           |
| [options.relaxed] | `boolean`            | `true`            | `true`の場合、可能な限りBSON型ではなくネイティブのJavaScript型を返します。 |

拡張JSONの文字列をパースし、その文字列によって記述されるJavaScriptの値またはオブジェクトを構築します。

**例**

```js
const { EJSON } = require('bson');
const text = '{ "int32": { "$numberInt": "10" } }';

// { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } } と出力されます
console.log(