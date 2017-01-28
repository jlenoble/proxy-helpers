'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLoopMethod = makeLoopMethod;
exports.default = makeLoopMethods;

var _isEnumerable = require('./is-enumerable');

var _isEnumerable2 = _interopRequireDefault(_isEnumerable);

var _getKeys = require('./get-keys');

var _getKeys2 = _interopRequireDefault(_getKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeLoopMethod(obj, _keys, name) {
  var keys = _getKeys2.default.bind(undefined, obj, _keys);

  switch (name) {
    case 'keys':
      return keys;

    case 'forEach':
      return function (func) {
        keys().forEach(function (key) {
          func(obj[key], key, obj);
        });
      };

    case 'some':
      return function (func) {
        return keys().some(function (key) {
          return func(obj[key], key, obj);
        });
      };

    case 'every':
      return function (func) {
        return keys().every(function (key) {
          return func(obj[key], key, obj);
        });
      };

    case 'map':
      return function (func) {
        var res = {};
        keys().forEach(function (key) {
          res[key] = func(obj[key], key, obj);
        });
        return res;
      };

    case 'snapshot':
      return function () {
        var res = {};
        keys().forEach(function (key) {
          var value = obj[key];
          if ((0, _isEnumerable2.default)(value)) {
            res[key] = makeLoopMethod(value, _keys, 'snapshot')();
          } else {
            res[key] = value;
          }
        });
        return res;
      };

    case 'equiv':
      return function (compObj) {
        if (!(0, _isEnumerable2.default)(compObj)) {
          return false;
        }

        var selfKeys = keys();
        var otherKeys = Object.keys(compObj);

        if (selfKeys.length !== otherKeys.length) {
          return false;
        }

        return selfKeys.every(function (key) {
          var value = obj[key];
          if (!(0, _isEnumerable2.default)(value)) {
            return value === compObj[key];
          }
          return makeLoopMethod(value, _keys, 'equiv')(compObj[key]);
        });
      };
  }
}

function makeLoopMethods(obj, keys, _names) {
  var loopMethods = {};
  var names = Object.assign({
    keys: 'keys',
    forEach: 'forEach',
    map: 'map',
    some: 'some',
    every: 'every',
    snapshot: 'snapshot',
    equiv: 'equiv'
  }, _names);

  Object.keys(names).forEach(function (name) {
    loopMethods[names[name]] = makeLoopMethod(obj, keys, name);
  });

  return loopMethods;
}