'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProxy;

var _makeProxiedMethods = require('./make-proxied-methods');

var _makeProxiedMethods2 = _interopRequireDefault(_makeProxiedMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isTestFriendly = Symbol();

function makeProxy(obj) {
  var helpers = (0, _makeProxiedMethods2.default)(obj);

  Object.defineProperty(helpers, isTestFriendly, {
    value: true
  });

  var proxy = new Proxy(obj, {
    get: function get(target, key) {
      if (helpers.hasOwnProperty(key)) {
        return helpers[key];
      }
      return target[key];
    },
    set: function set(target, key, value) {
      if (helpers.hasOwnProperty(key)) {
        throw new Error('Trying to overwrite a proxied method:', key);
      }
      target[key] = value; // eslint-disable-line no-param-reassign
      return true;
    }
  });

  return proxy;
}
module.exports = exports.default;