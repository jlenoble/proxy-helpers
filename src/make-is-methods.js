export default function makeIsMethods (obj) {
  const isMethods = {};

  ['writable', 'enumerable', 'configurable'].forEach(xable => {
    let method = 'propertyIs' + xable[0].toUpperCase() + xable.substr(1);

    isMethods[method] = function (name) {
      return Object.getOwnPropertyDescriptor(obj, name)[xable];
    };
  });

  return isMethods;
};
