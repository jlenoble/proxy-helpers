import makeLoopMethods from './make-loop-methods';
import makeIsMethods from './make-is-methods';

export default function makeProxiedMethods (obj) {
  const proxiedMethods = {};

  Object.assign(proxiedMethods, makeLoopMethods(obj, Object.keys(obj)));
  Object.assign(proxiedMethods, makeLoopMethods(obj,
    Object.getOwnPropertyNames(obj), {
      keys: 'ownProperties',
      forEach: 'forEachOwnProperty',
      map: 'mapOwnProperties',
      some: 'someOwnProperty',
      every: 'everyOwnProperty',
    }));

  Object.assign(proxiedMethods, makeIsMethods(obj));

  return proxiedMethods;
};
