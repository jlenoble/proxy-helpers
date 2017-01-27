import isEnumerable from '../src/is-enumerable';
import {expect} from 'chai';

describe('isEnumerable(obj)', function () {
  it('returns true on non empty objects, arrays and proxies', function () {
    [
      [2, 4], {name: 'foo', age: 100}, new Proxy({name: 'bar'}, {}),
    ].forEach(goodArg => {
      expect(isEnumerable(goodArg)).to.be.true;
    });
  });

  it('returns false on empty objects, arrays and proxies', function () {
    [
      [], {}, new Proxy({}, {}),
    ].forEach(badArg => {
      expect(isEnumerable(badArg)).to.be.false;
    });
  });

  it('returns false on base types, strings, functions, symbols', function () {
    [
      2, true, false, /.*/, new Date(), undefined, NaN, null,
      Infinity, Promise.resolve(), function () {}, '',
      new Function(), Symbol('quux'), 'foo',
      new String('bobo'), // eslint-disable-line no-new-wrappers
    ].forEach(badArg => {
      expect(isEnumerable(badArg)).to.be.false;
    });
  });
});
