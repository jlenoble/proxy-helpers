import makeLoopMethods from './make-loop-methods';

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

  return proxiedMethods;
};
