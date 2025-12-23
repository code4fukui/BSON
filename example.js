import { BSON } from "./BSON.js";

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
