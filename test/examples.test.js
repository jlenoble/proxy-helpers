import makeProxy from '../src/proxy-helpers';
import {expect} from 'chai';

describe('Testing README.md examples', function () {
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

    expect(p1.keys()).to.eql(['x']);
    expect(p1.ownPropertyKeys()).to.eql(['x', 'y']);
    expect(p1.attributeKeys()).to.eql(['x']);
    expect(p1.stateKeys()).to.eql(['y']);
    expect(p1.methodKeys()).to.eql(['hi', 'hello']);

    expect(p2.keys()).to.eql(['x', 'hi']);
    expect(p2.ownPropertyKeys()).to.eql(['x', 'y', 'hi']);
    expect(p2.attributeKeys()).to.eql(['x']);
    expect(p2.stateKeys()).to.eql(['y']);
    expect(p2.methodKeys()).to.eql(['hi', 'hello']);
  });
});
