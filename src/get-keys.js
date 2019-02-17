export function isExcludedMethod (method) {
  switch (method) {
  case 'constructor': case 'call': case 'apply': case 'bind':
    return true;

  default:
    return false;
  }
}

export function getAttributes (obj) {
  return Object.keys(obj).filter(key => {
    return typeof obj[key] !== 'function';
  });
}

export function getStates (obj) {
  return Object.getOwnPropertyNames(obj).filter(key => {
    return !Object.getOwnPropertyDescriptor(obj, key).enumerable &&
      typeof obj[key] !== 'function';
  });
}

export function getMethods (obj) {
  const instanceMethods = new Set();

  Object.getOwnPropertyNames(obj).filter(key => {
    return !isExcludedMethod(key) && typeof obj[key] === 'function';
  }).forEach(key => {
    instanceMethods.add(key);
  });

  let proto = obj;

  while (1) {
    proto = Object.getPrototypeOf(proto);

    if (!proto || proto === Object.prototype) {
      break;
    }

    Object.getOwnPropertyNames(proto).filter(key => {
      return !isExcludedMethod(key) && typeof obj[key] === 'function';
    }).forEach(key => {
      instanceMethods.add(key);
    });
  }

  return [...instanceMethods];
}

export function getAllMethods (obj) {
  const instanceMethods = new Set();

  Object.getOwnPropertyNames(obj).filter(key => {
    return !isExcludedMethod(key) && typeof obj[key] === 'function';
  }).forEach(key => {
    instanceMethods.add(key);
  });

  let proto = obj;

  while (1) {
    proto = Object.getPrototypeOf(proto);

    if (!proto) {
      break;
    }

    if (proto === Object.prototype) {
      Object.getOwnPropertyNames(proto).filter(key => {
        return typeof obj[key] === 'function';
      }).forEach(key => {
        instanceMethods.add(key);
      });
      break;
    } else {
      Object.getOwnPropertyNames(proto).filter(key => {
        return !isExcludedMethod(key) && typeof obj[key] === 'function';
      }).forEach(key => {
        instanceMethods.add(key);
      });
    }
  }

  return [...instanceMethods];
}

export default function getKeys (obj, keys) {
  switch (keys) {
  case 'attributes':
    return getAttributes(obj);

  case 'states':
    return getStates(obj);

  case 'methods':
    return getMethods(obj);

  case 'allMethods':
    return getAllMethods(obj);

  default:
    return Object[keys](obj);
  }
}
