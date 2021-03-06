import makeLoopMethods from './make-loop-methods';
import makeIsMethods from './make-is-methods';

export default function makeProxiedMethods (obj) {
  const proxiedMethods = {};

  Object.assign(proxiedMethods, makeLoopMethods(obj, 'keys'));
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'getOwnPropertyNames', {
    keys: 'ownPropertyKeys',
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
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'methods', {
    keys: 'methodKeys',
    forEach: 'forEachMethod',
    map: 'mapMethods',
    some: 'someMethod',
    every: 'everyMethod',
    snapshot: 'snapshotMethods',
    equiv: 'equivMethods',
  }));
  Object.assign(proxiedMethods, makeLoopMethods(obj, 'allMethods', {
    keys: 'allMethodKeys',
    forEach: 'forEachMethodAll',
    map: 'mapMethodsAll',
    some: 'someMethodAll',
    every: 'everyMethodAll',
    snapshot: 'snapshotMethodsAll',
    equiv: 'equivMethodsAll',
  }));

  Object.assign(proxiedMethods, makeIsMethods(obj));

  return proxiedMethods;
};
