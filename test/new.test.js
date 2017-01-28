import makeProxiedMethods from '../src/make-proxied-methods';
import {expect} from 'chai';

describe('makeProxiedMethods with classes', function () {
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

  it('Simple class, all methods on prototype', function () {
    const c = new Child(1, 2);

    const child = makeProxiedMethods(c);

    expect(child.snapshot()).to.eql({
      x: 1,
    });
    expect(child.snapshotOwnProperties()).to.eql({
      x: 1,
      y: 2,
    });
    expect(child.snapshotAttributes()).to.eql({
      x: 1,
    });

    expect(child.equiv({
      x: 1,
    })).to.be.true;
    expect(child.equivOwnProperties({
      x: 1,
      y: 2,
    })).to.be.true;
    expect(child.equivAttributes({
      x: 1,
    })).to.be.true;

    expect(child.keys()).to.eql(['x']);
    expect(child.ownProperties()).to.eql(['x', 'y']);
    expect(child.attributeKeys()).to.eql(['x']);
  });

  it('Class with one method overloaded in ctor', function () {
    const c = new OtherChild(1, 2);

    const child = makeProxiedMethods(c);

    expect(child.snapshot()).to.eql({
      x: 1,
      hi: c.hi,
    });
    expect(child.snapshotOwnProperties()).to.eql({
      x: 1,
      y: 2,
      hi: c.hi,
    });
    expect(child.snapshotAttributes()).to.eql({
      x: 1,
    });

    expect(child.equiv({
      x: 1,
      hi: c.hi,
    })).to.be.true;
    expect(child.equivOwnProperties({
      x: 1,
      y: 2,
      hi: c.hi,
    })).to.be.true;
    expect(child.equivAttributes({
      x: 1,
    })).to.be.true;

    expect(child.keys()).to.eql(['x', 'hi']);
    expect(child.ownProperties()).to.eql(['x', 'y', 'hi']);
    expect(child.attributeKeys()).to.eql(['x']);
  });
});
