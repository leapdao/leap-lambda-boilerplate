/**
 * Copyright (c) 2018-present, LeapDAO (leapdao.org)
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

module.exports = class DynamoDb {
  constructor(dynamo) {
    this.dynamo = dynamo;
  }

  add(params) {
    return new Promise((fulfill, reject) => {
      this.dynamo.put(params, (err, rsp) => {
        if (err) {
          return reject(err);
        }
        return fulfill(rsp.Item);
      });
    });
  }

  get(params) {
    return new Promise((fulfill, reject) => {
      this.dynamo.get(params, (err, rsp) => {
        if (err) {
          if (err.code === 'ResourceNotFoundException') return fulfill();
          return reject(err);
        }
        return fulfill(rsp.Item);
      });
    });
  }

  update(params) {
    return new Promise((fulfill, reject) => {
      this.dynamo.update(params, (err, rsp) => {
        if (err) {
          return reject(err);
        }
        return fulfill(rsp.Item);
      });
    });
  }

  query(params) {
    return new Promise((fulfill, reject) => {
      this.dynamo.query(params, (err, rsp) => {
        if (err) {
          return reject(err);
        }
        return fulfill(rsp.Items);
      });
    });
  }

  scan(params) {
    return new Promise((fulfill, reject) => {
      this.dynamo.scan(params, (err, rsp) => {
        if (err) {
          return reject(err);
        }
        return fulfill(rsp.Items);
      });
    });
  }
}
