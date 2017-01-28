'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProxiedMethods;

var _makeLoopMethods = require('./make-loop-methods');

var _makeLoopMethods2 = _interopRequireDefault(_makeLoopMethods);

var _makeIsMethods = require('./make-is-methods');

var _makeIsMethods2 = _interopRequireDefault(_makeIsMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeProxiedMethods(obj) {
  var proxiedMethods = {};

  Object.assign(proxiedMethods, (0, _makeLoopMethods2.default)(obj, 'keys'));
  Object.assign(proxiedMethods, (0, _makeLoopMethods2.default)(obj, 'getOwnPropertyNames', {
    keys: 'ownProperties',
    forEach: 'forEachOwnProperty',
    map: 'mapOwnProperties',
    some: 'someOwnProperty',
    every: 'everyOwnProperty',
    snapshot: 'snapshotOwnProperties',
    equiv: 'equivOwnProperties'
  }));
  Object.assign(proxiedMethods, (0, _makeLoopMethods2.default)(obj, 'attributes', {
    keys: 'attributeKeys',
    forEach: 'forEachAttribute',
    map: 'mapAttributes',
    some: 'someAttribute',
    every: 'everyAttribute',
    snapshot: 'snapshotAttributes',
    equiv: 'equivAttributes'
  }));
  Object.assign(proxiedMethods, (0, _makeLoopMethods2.default)(obj, 'states', {
    keys: 'stateKeys',
    forEach: 'forEachState',
    map: 'mapStates',
    some: 'someState',
    every: 'everyState',
    snapshot: 'snapshotStates',
    equiv: 'equivStates'
  }));
  Object.assign(proxiedMethods, (0, _makeLoopMethods2.default)(obj, 'methods', {
    keys: 'methodKeys',
    forEach: 'forEachMethod',
    map: 'mapMethods',
    some: 'someMethod',
    every: 'everyMethod',
    snapshot: 'snapshotMethods',
    equiv: 'equivMethods'
  }));

  Object.assign(proxiedMethods, (0, _makeIsMethods2.default)(obj));

  return proxiedMethods;
};
module.exports = exports['default'];