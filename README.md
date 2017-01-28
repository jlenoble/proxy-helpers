# proxy-helpers
Extend objects with sugar methods without touching their prototypes

## Usage

Function ```makeProxy``` returns a proxy to its argument coated with many sugar methods allowing to manipulate it and to get to its internals. Only object types are handled though (including Array-like structures);

### An actual proxy

```makeProxy``` uses the ```Proxy``` constructor to create its proxy before coating it with sugar, making sure the returned object behaves in every respect like the original object when sugar methods are not called.

```js
import makeProxy from 'proxy-helpers';

const obj = {
  a: 1,
  b: 'foo',
};
const o = makeProxy(obj);

o.a; // 1
o.b; // 'foo'
o.a = 2;
obj.a; // 2
o.c = 3;
obj.c; // 3

const arr = [0, 1, 2];
const a = makeProxy(arr);

a[0]; // 0
a[1] = 6;
arr[1]; // 6
a.push(9);
arr[3]; // 9
```

### Getting properties

A few methods are provided to steamline getting at the original object internals.

* ```keys()```: Returns all enumerable keys of instance.
* ```ownPropertyKeys()```: Returns all property keys of instance.
* ```attributeKeys()```: ```keys()``` restricted to non functions.
* ```stateKeys()```: Non enumerable, non function keys of instance.
* ```methodKeys()```: all function keys, up the prototype chain of instance, ```Object.prototype``` excluded, instance included.

```js
import makeProxy from 'proxy-helpers';

class Parent {
  constructor (x, y) {
    this.x = x;
    Object.defineProperty(this, 'y', {
      value: y,
      writable: true,
    });
  }

  hi () {
    return 'hi parent';
  }

  hello () {
    return 'hello parent';
  }
}

class Child extends Parent {
  hi () {
    return 'hi child';
  }
}

class OtherChild extends Parent {
  constructor (x, y) {
    super(x, y);

    this.hi = function () {
      return 'hi other child';
    };
  }
}

const c1 = new Child(1, 2);
const c2 = new OtherChild(1, 2);

const p1 = makeProxy(c1);
const p2 = makeProxy(c2);

p1.keys(); // ['x'];
p1.ownPropertyKeys(); // ['x', 'y'];
p1.attributeKeys(); // ['x'];
p1.stateKeys(); // ['y'];
p1.methodKeys(); // ['hi', 'hello'];

p2.keys(); // ['x', 'hi'];
p2.ownPropertyKeys(); // ['x', 'y', 'hi'];
p2.attributeKeys(); // ['x'];
p2.stateKeys(); // ['y'];
p2.methodKeys(); // ['hi', 'hello'];
```

### Looping over properties

* ```forEach((value, key, obj) => {...})```: like Array forEach, applied to enumerable properties of instance.
* ```map((value, key, obj) => {...})```: like Array map, applied to enumerable properties of instance.
* ```some((value, key, obj) => {...})```: like Array some, applied to enumerable properties of instance.
* ```every((value, key, obj) => {...})```: like Array every, applied to enumerable properties of instance.

There exist corresponding counterparts for different sets of keys (see [Getting properties](#getting-properties)):

* forEachOwnProperty/mapOwnProperties/someOwnProperty/everyOwnProperty
* forEachAttribute/mapAttributes/someAttribute/everyAttribute
* forEachState/mapStates/someState/everyState
* forEachMethod/mapMethods/someMethod/everyMethod

### Testing descriptors

* ```propertyIsWritable(key)```: Whether or not key property is writable.
* ```propertyIsEnumerable(key)```: Whether or not key property is enumerable.
* ```propertyIsConfigurable(key)```: Whether or not key property is configurable.

### Taking a snapshot

Any time you can take a snatshot of a set of properties, calling with no arguments methods snapshot/snapshotOwnProperties/snapshotAttributes/snapshotStates/snapshotMethods.

### Comparing

Any time you can take compare of a set of properties to expected values calling equiv/equivOwnProperties/equivAttributes/equivStates/equivMethods.

## License

proxy-helpers is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
