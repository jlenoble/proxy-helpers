import makeProxy from '../src/proxy-helpers';
import {expect} from 'chai';

describe('Testing README.md examples', function () {
  it('An actual proxy example', function () {
    const obj = {
      a: 1,
      b: 'foo',
    };
    const o = makeProxy(obj);

    expect(o.a).to.equal(1);
    expect(o.b).to.equal('foo');
    o.a = 2;
    expect(obj.a).to.equal(2);
    o.c = 3;
    expect(obj.c).to.equal(3);

    const arr = [0, 1, 2];
    const a = makeProxy(arr);

    expect(a[0]).to.equal(0);
    a[1] = 6;
    expect(arr[1]).to.equal(6);
    a.push(9);
    expect(arr[3]).to.equal(9);
  });

  it('Getting properties example', function () {
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

    const okeys = Object.getOwnPropertyNames(Object.prototype).filter(key => {
      return typeof Object.prototype[key] === 'function';
    });

    expect(p1.keys()).to.eql(['x']);
    expect(p1.ownPropertyKeys()).to.eql(['x', 'y']);
    expect(p1.attributeKeys()).to.eql(['x']);
    expect(p1.stateKeys()).to.eql(['y']);
    expect(p1.methodKeys()).to.eql(['hi', 'hello']);
    expect(p1.allMethodKeys()).to.eql(['hi', 'hello', ...okeys]);

    expect(p2.keys()).to.eql(['x', 'hi']);
    expect(p2.ownPropertyKeys()).to.eql(['x', 'y', 'hi']);
    expect(p2.attributeKeys()).to.eql(['x']);
    expect(p2.stateKeys()).to.eql(['y']);
    expect(p2.methodKeys()).to.eql(['hi', 'hello']);
    expect(p2.allMethodKeys()).to.eql(['hi', 'hello', ...okeys]);
  });
});
