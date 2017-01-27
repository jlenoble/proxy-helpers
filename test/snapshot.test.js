import makeLoopMethods from '../src/make-loop-methods';
import isEnumerable from '../src/is-enumerable';
import {expect} from 'chai';

describe('makeLoopMethods(obj, keys, names).snapshot()', function () {
  it('Using literal obj, Object.keys and no names', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const methods = makeLoopMethods(obj, 'keys');

    let s = methods.snapshot();

    expect(s).to.eql(obj);

    methods.forEach((x, key, obj) => {
      obj[key] = 2 * x; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      b: 4,
    });

    expect(s).not.to.eql(obj);

    s = methods.snapshot();

    expect(s).to.eql(obj);
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

    const methods = makeLoopMethods(obj, 'keys');

    let s = methods.snapshot();

    expect(s).to.eql(obj);

    const func = (x, key, obj) => {
      if (isEnumerable(x)) {
        Object.keys(x).forEach(key => {
          func(x[key], key, x);
        });
      } else {
        obj[key] = 2 * x; // eslint-disable-line no-param-reassign
      }
    };

    methods.forEach(func);

    expect(obj).to.eql({
      a: 2,
      b: {
        c: 4,
        d: {
          e: 6,
        },
      },
    });

    expect(s).not.to.eql(obj);

    s = methods.snapshot();

    expect(s).to.eql(obj);
  });
});
