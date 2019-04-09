/**
 * Copyright (c) 2018-present, LeapDAO (leapdao.org)
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

const { NotFound } = require('./errors');

const toRegExp = pattern =>
  new RegExp(`^${pattern.replace(/\//, '/', 'g').replace(/:.+($|\/)/, '.+?$1', 'g')}/?($|\\?.*$)`);

module.exports =  class Router {

  /**
   * Example routes:
   * [
   *   ['POST', '/orders/btc', this.btcOrders.create.bind(this.btcOrders)],
   *   ['GET', '/orders/btc', this.btcOrders.list.bind(this.btcOrders)],
   *   ['PUT', '/orders/btc/:order_id', this.btcOrders.update.bind(this.btcOrders)],
   *   ['POST', '/orders/btc/fulfill', this.btcOrders.fulfill.bind(this.btcOrders)],
   *   ['POST', '/orders/btc/status', this.btcOrders.status.bind(this.btcOrders)],
   * ]
   * @param {Array[3]} routes - array with routes in format [method, path, controller]
   */
  constructor(routes) {
    this.routes = routes;
  }

  dispatch(method, path, ctx) {
    const route = this.routes.find(([aMethod, pathPattern]) =>
      aMethod === method && toRegExp(pathPattern).test(path),
    );
    if (!route) throw new NotFound(`Not Found: unexpected path ${path}`);
    const [,, handler] = route;
    return handler(ctx);
  }
}
