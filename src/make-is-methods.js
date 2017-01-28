export default function makeIsMethods (obj) {
  const isMethods = {};

  ['writable', 'enumerable', 'configurable'].forEach(xable => {
    let method = 'propertyIs' + xable[0].toUpperCase() + xable.substr(1);

    isMethods[method] = function (name) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, name);
      if (descriptor !== undefined) {
        return descriptor[xable];
      };
    };
  });

  return isMethods;
};
