import isEnumerable from './is-enumerable';

export function makeLoopMethod (obj, _keys, name) {
  const keys = Object[_keys](obj);

  switch (name) {
  case 'keys':
    return function () {
      return keys;
    };

  case 'forEach':
    return function (func) {
      keys.forEach(key => {
        func(obj[key], key, obj);
      });
    };

  case 'some':
    return function (func) {
      return keys.some(key => {
        return func(obj[key], key, obj);
      });
    };

  case 'every':
    return function (func) {
      return keys.every(key => {
        return func(obj[key], key, obj);
      });
    };

  case 'map':
    return function (func) {
      const res = {};
      keys.forEach(key => {
        res[key] = func(obj[key], key, obj);
      });
      return res;
    };

  case 'snapshot':
    return function () {
      const res = {};
      keys.forEach(key => {
        const value = obj[key];
        if (isEnumerable(value)) {
          res[key] = makeLoopMethod(value, _keys, 'snapshot')();
        } else {
          res[key] = value;
        }
      });
      return res;
    };
  }
}

export default function makeLoopMethods (obj, keys, _names) {
  const loopMethods = {};
  const names = Object.assign({
    keys: 'keys',
    forEach: 'forEach',
    map: 'map',
    some: 'some',
    every: 'every',
    snapshot: 'snapshot',
  }, _names);

  Object.keys(names).forEach(name => {
    loopMethods[names[name]] = makeLoopMethod(obj, keys, name);
  });

  return loopMethods;
}
