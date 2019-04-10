/**
 * Copyright (c) 2019-present, LeapDAO (leapdao.org)
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

const readEncrypted = name => new Promise((resolve, reject) => {
  ssm.getParameter({ Name: name, WithDecryption: true }, (err, data) => {
    if (err) return reject(err);
    return resolve(data.Parameter.Value);
  });
});

module.exports = { readEncrypted };