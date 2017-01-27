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
  }));

  Object.assign(proxiedMethods, makeIsMethods(obj));

  return proxiedMethods;
};
