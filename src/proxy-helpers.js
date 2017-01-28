import makeProxiedMethods from './make-proxied-methods';

const isTestFriendly = Symbol();

export default function makeProxy (obj) {
  const helpers = makeProxiedMethods(obj);

  Object.defineProperty(helpers, isTestFriendly, {
    value: true,
  });

  const proxy = new Proxy(obj, {
    get (target, key) {
      if (helpers.hasOwnProperty(key)) {
        return helpers[key];
      }
      return target[key];
    },
    set (target, key, value) {
      if (helpers.hasOwnProperty(key)) {
        throw new Error('Trying to overwrite a proxied method:', key);
      }
      target[key] = value; // eslint-disable-line no-param-reassign
      return true;
    },
  });

  return proxy;
}
