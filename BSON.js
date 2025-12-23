import { BSON as _BSON } from './lib/bson.mjs';

export class BSON {
  static encode(obj) {
    return _BSON.serialize(obj);
  }
  static decode(bin) {
    return _BSON.deserialize(bin);
  }
}
