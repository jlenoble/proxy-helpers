import makeIsMethods from '../src/make-is-methods';
import {expect} from 'chai';

describe('makeIsMethods(obj)', function () {
  it('returns correct booleans', function () {
    const obj = {
      a: 1,
      b: 2,
    };
    Object.defineProperty(obj, 'c', {
      value: 3,
      writable: true,
    });

    const methods = makeIsMethods(obj);

    expect(methods.propertyIsWritable('a')).to.be.true;
    expect(methods.propertyIsWritable('b')).to.be.true;
    expect(methods.propertyIsWritable('c')).to.be.true;

    expect(methods.propertyIsEnumerable('a')).to.be.true;
    expect(methods.propertyIsEnumerable('b')).to.be.true;
    expect(methods.propertyIsEnumerable('c')).to.be.false;

    expect(methods.propertyIsConfigurable('a')).to.be.true;
    expect(methods.propertyIsConfigurable('b')).to.be.true;
    expect(methods.propertyIsConfigurable('c')).to.be.false;
  });
});
