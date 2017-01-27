import makeLoopMethods from '../src/make-loop-methods';
import {expect} from 'chai';

describe('makeLoopMethods(obj, keys, names).snapshot()', function () {
  it('Using literal obj, Object.keys and no names', function () {
    const obj = {
      a: 1,
      b: 2,
    };
    const keys = Object.keys(obj);

    const methods = makeLoopMethods(obj, keys);

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
});
