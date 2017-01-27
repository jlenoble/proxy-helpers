import makeLoopMethods from '../src/make-loop-methods';
import {expect} from 'chai';

describe('makeLoopMethods(obj, keys, names).equiv(compObj)', function () {
  it('Using literal obj, Object.keys and no names', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const {equiv} = makeLoopMethods(obj, 'keys');

    expect(equiv({
      a: 1,
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: 2,
    })).to.be.true;
    expect(equiv({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.false;
  });

  it('Using deep literal obj, Object.keys and no names', function () {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    const {equiv} = makeLoopMethods(obj, 'keys');

    expect(equiv({
      a: 1,
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: 2,
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: {
        c: 2,
      },
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 4,
        },
      },
    })).to.be.false;
    expect(equiv({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    })).to.be.true;
    expect(equiv({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4,
        },
      },
    })).to.be.false;
  });
});
