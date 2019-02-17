'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeIsMethods;
function makeIsMethods(obj) {
  var isMethods = {};

  ['writable', 'enumerable', 'configurable'].forEach(function (xable) {
    var method = 'propertyIs' + xable[0].toUpperCase() + xable.substr(1);

    isMethods[method] = function (name) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, name);
      if (descriptor !== undefined) {
        return descriptor[xable];
      };
    };
  });

  return isMethods;
};
module.exports = exports.default;