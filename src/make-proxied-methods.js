import makeLoopMethods from './make-loop-methods';
import makeIsMethods from './make-is-methods';

export default function makeProxiedMethods (obj) {
  const proxiedMethods = {};

  Object.assign(proxiedMethods, makeLoopMethods(obj, 'keys'));
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'getOwnPropertyNames', {
    keys: 'ownProperties',
    forEach: 'forEachOwnProperty',
    map: 'mapOwnProperties',
    some: 'someOwnProperty',
    every: 'everyOwnProperty',
    snapshot: 'snapshotOwnProperties',
    equiv: 'equivOwnProperties',
  }));
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'attributes', {
    keys: 'attributeKeys',
    forEach: 'forEachAttribute',
    map: 'mapAttributes',
    some: 'someAttribute',
    every: 'everyAttribute',
    snapshot: 'snapshotAttributes',
    equiv: 'equivAttributes',
  }));
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'states', {
    keys: 'stateKeys',
    forEach: 'forEachState',
    map: 'mapStates',
    some: 'someState',
    every: 'everyState',
    snapshot: 'snapshotStates',
    equiv: 'equivStates',
  }));

  Object.assign(proxiedMethods, makeIsMethods(obj));

  return proxiedMethods;
};
