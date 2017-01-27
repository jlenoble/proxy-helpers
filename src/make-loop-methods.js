import isEnumerable from './is-enumerable';

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
    switch (name) {
    case 'keys':
      loopMethods[names[name]] = function () {
        return keys;
      };
      break;

    case 'forEach':
      loopMethods[names[name]] = function (func) {
        keys.forEach(key => {
          func(obj[key], key, obj);
        });
      };
      break;

    case 'some':
      loopMethods[names[name]] = function (func) {
        return keys.some(key => {
          return func(obj[key], key, obj);
        });
      };
      break;

    case 'every':
      loopMethods[names[name]] = function (func) {
        return keys.every(key => {
          return func(obj[key], key, obj);
        });
      };
      break;

    case 'map':
      loopMethods[names[name]] = function (func) {
        const res = {};
        keys.forEach(key => {
          res[key] = func(obj[key], key, obj);
        });
        return res;
      };
      break;

    case 'snapshot':
      loopMethods[names[name]] = function () {
        const res = {};
        keys.forEach(key => {
          const value = obj[key];
          if (isEnumerable(value)) {
            const meths = makeLoopMethods(value);
            res[key] = meths.snapshot();
          } else {
            res[key] = value;
          }
        });
        return res;
      };
      break;
    }
  });

  return loopMethods;
}
