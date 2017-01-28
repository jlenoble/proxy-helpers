'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isEnumerable;
function isEnumerable(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  if (type === 'string' || obj instanceof String) {
    return false;
  }
  return type === 'object' && obj !== null && (obj.length > 0 || Object.keys(obj).length > 0);
}
module.exports = exports['default'];