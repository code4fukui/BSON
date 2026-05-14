# BSON

BSONは"Binary JSON"の略で、JSONに類似したドキュメントのバイナリエンコードされたシリアライズ形式です。
詳細については[仕様書](http://bsonspec.org)をご覧ください。

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

- [使用方法](#usage)
- [バグ / 機能リクエスト](#bugs--feature-requests)
- [インストール](#installation)
- [ドキュメント](#documentation)
- [よくある質問](#faq)

### バグ / 機能リクエスト

バグを見つけたとお考えですか？`bson`に新機能を追加してほしいですか？当社の課題管理ツールであるJIRAでケースを作成してください：

1. アカウントを作成してログインします: [jira.mongodb.org](https://jira.mongodb.org)
2. NODEプロジェクトに移動します: [jira.mongodb.org/browse/NODE](https://jira.mongodb.org/browse/NODE)
3. **Create Issue** をクリックします - 課題に関する情報と再現方法を可能な限り詳細に提供してください。

NODEドライバープロジェクトのJIRAにおけるバグ報告は**公開**されています。

## 使用方法

新しいバージョンをビルドするには、以下の操作を実行します：

```
npm install
npm run build
```

### Node.jsまたはバンドラーでの使用

バンドラーやNode.jsを使用する場合、パッケージ名を使ってbsonをインポートできます：

```js
import { BSON, EJSON, ObjectId } from 'bson';
// または：
// const { BSON, EJSON, ObjectId } = require('bson');

const bytes = BSON.serialize({ _id: new ObjectId() });
console.log(bytes);
const doc = BSON.deserialize(bytes);
console.log(EJSON.stringify(doc));
// {"_id":{"$oid":"..."}}
```

### ブラウザでの使用

バンドラーを使用せずにブラウザで直接作業する場合は、以下のように`.mjs`バンドルを使用してください：

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

## インストール

```sh
npm install bson
```

### MongoDB Node.js Driverのバージョン互換性

[MongoDB Node.js Driver](https://github.com/mongodb/node-mongodb-native)との組み合わせにおいて、以下のバージョンのみが安定版と見なされます。

|               | `bson@1.x` | `bson@4.x` | `bson@5.x` | `bson@6.x` | `bson@7.x` |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| `mongodb@7.x` | N/A        | N/A        | N/A        | N/A        | ✓          |
| `mongodb@6.x` | N/A        | N/A        | N/A        | ✓          | N/A        |
| `mongodb@5.x` | N/A        | N/A        | ✓          | N/A        | N/A        |
| `mongodb@4.x` | N/A        | ✓          | N/A        | N/A        | N/A        |
| `mongodb@3.x` | ✓          | N/A        | N/A        | N/A        | N/A        |

## ドキュメント

### BSON

[APIドキュメント](https://mongodb.github.io/node-mongodb-native/Next/modules/BSON.html)

<a name="EJSON"></a>

### EJSON

- [EJSON](#EJSON)

  - [.parse(text, [options])](#EJSON.parse)

  - [.stringify(value, [replacer], [space], [options])](#EJSON.stringify)

  - [.serialize(bson, [options])](#EJSON.serialize)

  - [.deserialize(ejson, [options])](#EJSON.deserialize)

<a name="EJSON.parse"></a>

#### _EJSON_.parse(text, [options])

| パラメータ | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| text | <code>string</code> | | |
| [options] | <code>object</code> | | オプション設定 |
| [options.relaxed] | <code>boolean</code> | <code>true</code> | （trueの場合）可能であればBSON型ではなく、ネイティブのJS型を返すように試みる |

拡張JSON (Extended JSON) 文字列をパースし、その文字列が記述するJavaScriptの値またはオブジェクトを構築します。

**例**

```js
const { EJSON } = require('bson');
const text = '{ "int32": { "$numberInt": "10" } }';

// { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } } を出力
console.log(EJSON.parse(text, { relaxed: false }));

// { int32: 10 } を出力
console.log(EJSON.parse(text));
```

<a name="EJSON.stringify"></a>

#### _EJSON_.stringify(value, [replacer], [space], [options])

| パラメータ | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| value | <code>object</code> | | 拡張JSONに変換する値 |
| [replacer] | <code>function</code> \| <code>array</code> | | 文字列化プロセスの動作を変更する関数、またはJSON文字列に含める値オブジェクトのプロパティを選択/フィルタリングするためのホワイトリストとして機能するStringおよびNumberオブジェクトの配列。この値がnullまたは指定されていない場合、オブジェクトのすべてのプロパティが結果のJSON文字列に含まれます |
| [space] | <code>string</code> \| <code>number</code> | | 空白を挿入するために使用されるStringまたはNumberオブジェクト |

## ライセンス

MIT License — [LICENSE](LICENSE) を参照してください。
