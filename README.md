# proxy-helpers
Extend objects with sugar methods without touching their prototypes

## Usage

Applied to an object, function ```makeProxy``` returns a proxy to that object coated with many sugar methods allowing to manipulate it and to get to its internals.

### Getting properties

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

## License

proxy-helpers is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
