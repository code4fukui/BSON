# BSON

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

- [使い方](#使い方)
- [バグ・機能リクエスト](#バグ機能リクエスト)
- [インストール](#インストール)
- [ドキュメンテーション](#ドキュメンテーション)
- [FAQ](#faq)

### リリースの整合性

リリースは自動的に作成され、[Node チームの GPG キー](https://pgp.mongodb.com/node-driver.asc) を使用してサインされます。 これはGitタグと GitHub リリースの一部として提供されるすべてのリリースパッケージに適用されます。 提供されたパッケージを検証するには、キーをダウンロードしてgpgを使ってインポートします:

```shell
gpg --import node-driver.asc
```

GitHub リリースには NPM パッケージ用の detached 署名ファイル (名前は `bson-X.Y.Z.tgz.sig`) が含まれています。

以下のコマンドは NPM パッケージのリンクを返します。
```shell
npm view bson@vX.Y.Z dist.tarball 
```

上記のコマンドの結果を使って、`curl` コマンドでリリース用の公式 npm パッケージを取得できます。

ダウンロードしたパッケージの整合性を検証するには、以下のコマンドを実行します:
```shell
gpg --verify bson-X.Y.Z.tgz.sig bson-X.Y.Z.tgz
```

>[!Note]
> npm でパッケージをインストールする際には検証は行われません。 GitHub tarball と npm の tarball の内容は同一です。

## バグ・機能リクエスト

バグを見つけた? 新機能を希望する? 以下の手順でIssueを管理するツール(JIRA)に報告してください:

1. アカウントを作成してログイン: [jira.mongodb.org](https://jira.mongodb.org)
2. NODE プロジェクトに移動: [jira.mongodb.org/browse/NODE](https://jira.mongodb.org/browse/NODE) 
3. 「Create Issue」をクリック - 再現手順など、可能な限り詳細な情報を提供してください。

NODE ドライバのプロジェクトにおけるJIRAのバグレポートは**公開**されます。

## 使い方

新しいバージョンをビルドするには以下の操作を行います:

```
npm install
npm run build
```

### Node.jsまたはバンドリング

Node.jsやバンドラーを使う場合は、パッケージ名からBSONをインポートできます:

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

### ブラウザ

ブラウザで直接使う場合は `.mjs` バンドルを使ってください:

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

### MongoDB Node.jsドライバのバージョン互換性

以下のバージョンの組み合わせのみが[MongoDB Node.jsドライバ](https://github.com/mongodb/node-mongodb-native)と安定して動作することが保証されています。

|               | `bson@1.x` | `bson@4.x` | `bson@5.x` | `bson@6.x` | `bson@7.x` |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| `mongodb@7.x` | N/A        | N/A        | N/A        | N/A        | ✓          |
| `mongodb@6.x` | N/A        | N/A        | N/A        | ✓          | N/A        |
| `mongodb@5.x` | N/A        | N/A        | ✓          | N/A        | N/A        |
| `mongodb@4.x` | N/A        | ✓          | N/A        | N/A        | N/A        |
| `mongodb@3.x` | ✓          | N/A        | N/A        | N/A        | N/A        |

## ドキュメンテーション

### BSON
[APIドキュメンテーション](https://mongodb.github.io/node-mongodb-native/Next/modules/BSON.html)

<a name="EJSON"></a>

### EJSON

- [EJSON](#EJSON)

  - [.parse(text, [options])](#EJSON.parse)

  - [.stringify(value, [replacer], [space], [options])](#EJSON.stringify)

  - [.serialize(bson, [options])](#EJSON.serialize)

  - [.deserialize(ejson, [options])](#EJSON.deserialize)

<a name="EJSON.parse"></a>

#### _EJSON_.parse(text, [options])

| パラメータ     | 型                   | デフォルト        | 説明                                                                        |
| -------------- | -------------------- | ----------------- | ------------------------------------------------------------------------- |
| text           | <code>string</code>  |                   |                                                                            |
| [options]      | <code>object</code>  |                   | オプション設定                                                            |
| [options.relaxed] | <code>boolean</code> | <code>true</code> | 可能な限り、BSONタイプではなく、ネイティブのJSタイプを返す (trueの場合) |

拡張JSONの文字列をパースし、その文字列によって記述されるJavaScriptの値またはオブジェクトを構築します。

**例**

```js
const { EJSON } =