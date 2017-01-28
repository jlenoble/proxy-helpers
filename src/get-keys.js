export default function getKeys (obj, keys) {
  switch (keys) {
  case 'attributes':
    return Object.keys(obj).filter(key => {
      return typeof obj[key] !== 'function';
    });

  case 'states':
    return Object.getOwnPropertyNames(obj).filter(key => {
      return !Object.getOwnPropertyDescriptor(obj, key).enumerable &&
        typeof obj[key] !== 'function';
    });

  case 'methods':
    const instanceMethods = new Set();

    Object.getOwnPropertyNames(obj).filter(key => {
      return typeof obj[key] === 'function';
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
        return key !== 'constructor' && typeof obj[key] === 'function';
      }).forEach(key => {
        instanceMethods.add(key);
      });
    }

    return [...instanceMethods];

  default:
    return Object[keys](obj);
  }
}
