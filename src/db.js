/**
 * Copyright (c) 2018-present, Leap DAO (leapdao.org)
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

let simpledb;

if (process.env.IS_OFFLINE !== 'true' && process.env.npm_lifecycle_event !== 'test') {
  const AWS = require('aws-sdk');
  simpledb = new AWS.SimpleDB({ region: 'eu-west-1' });
}

// transform from key/value to list and back
const transform = (data) => {
  let attributes;
  if (Array.isArray(data)) {
    attributes = {};
    data.forEach((aPair) => {
      if (!attributes[aPair.Name]) {
        attributes[aPair.Name] = {};
      }
      attributes[aPair.Name] = aPair.Value;
    });
  } else {
    attributes = [];
    Object.keys(data).forEach((anAttributeName) => {
      if (Array.isArray(data[anAttributeName])) {
        data[anAttributeName].forEach((aValue) => {
          attributes.push({
            Name: anAttributeName,
            Value: aValue,
          });
        });
      } else {
        attributes.push({
          Name: anAttributeName,
          Value: data[anAttributeName],
        });
      }
    });
  }
  return attributes;
};

module.exports = class Db {

  constructor(tableName) {
    this.sdb = simpledb;
    this.tableName = tableName;
  }

  _method(name, params) {
    return new Promise((resolve, reject) => {
      this.sdb[name](params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  setAttr(itemName, attrName, attrVal) {
    if (!this.sdb) return;
    return this.putAttributes({
      DomainName: this.tableName,
      ItemName: itemName,
      Attributes: [
        { Name: attrName, Value: attrVal, Replace: true },
      ],
    });
  }

  async getAttr(itemName, defaultValue = {}) {
    if (!this.sdb) return defaultValue;

    const data = await this.getAttributes({
      DomainName: this.tableName,
      ItemName: itemName,
    });

    return Object.assign(defaultValue, transform(data.Attributes || []));
  }

  putAttributes(params) {
    return this._method('putAttributes', params);
  }

  getAttributes(params) {
    return this._method('getAttributes', params);
  }

}
