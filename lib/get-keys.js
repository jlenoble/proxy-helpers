'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExcludedMethod = isExcludedMethod;
exports.getAttributes = getAttributes;
exports.getStates = getStates;
exports.getMethods = getMethods;
exports.default = getKeys;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isExcludedMethod(method) {
  switch (method) {
    case 'constructor':case 'call':case 'apply':case 'bind':
      return true;

    default:
      return false;
  }
}

function getAttributes(obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] !== 'function';
  });
}

function getStates(obj) {
  return Object.getOwnPropertyNames(obj).filter(function (key) {
    return !Object.getOwnPropertyDescriptor(obj, key).enumerable && typeof obj[key] !== 'function';
  });
}

function getMethods(obj) {
  var instanceMethods = new Set();

  Object.getOwnPropertyNames(obj).filter(function (key) {
    return !isExcludedMethod(key) && typeof obj[key] === 'function';
  }).forEach(function (key) {
    instanceMethods.add(key);
  });

  var proto = obj;

  while (1) {
    proto = Object.getPrototypeOf(proto);

    if (!proto || proto === Object.prototype) {
      break;
    }

    Object.getOwnPropertyNames(proto).filter(function (key) {
      return !isExcludedMethod(key) && typeof obj[key] === 'function';
    }).forEach(function (key) {
      instanceMethods.add(key);
    });
  }

  return [].concat(_toConsumableArray(instanceMethods));
}

function getKeys(obj, keys) {
  switch (keys) {
    case 'attributes':
      return getAttributes(obj);

    case 'states':
      return getStates(obj);

    case 'methods':
      return getMethods(obj);

    default:
      return Object[keys](obj);
  }
}