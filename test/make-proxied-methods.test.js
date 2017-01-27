import makeProxiedMethods from '../src/make-proxied-methods';
import {expect} from 'chai';

describe('makeProxiedMethods(obj)', function () {
  it('Testing loop methods', function () {
    const obj = {
      a: 1,
      b: 2,
    };
    Object.defineProperty(obj, 'c', {
      value: 3,
      writable: true,
    });

    const methods = makeProxiedMethods(obj);

    expect(methods.keys()).to.eql(['a', 'b']);

    methods.forEach((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      b: 4,
    });
    expect(obj.c).to.equal(3);

    expect(methods.map(value => value + 10)).to.eql({
      a: 12,
      b: 14,
    });
    expect(obj.c).to.equal(3);

    expect(methods.some(value => value === 2)).to.be.true;
    expect(methods.some(value => value === 5)).to.be.false;
    expect(methods.every(value => value < 5)).to.be.true;
    expect(methods.every(value => value < 4)).to.be.false;

    expect(methods.ownProperties()).to.eql(['a', 'b', 'c']);

    methods.forEachOwnProperty((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 4,
      b: 8,
    });
    expect(obj.c).to.equal(6);

    expect(methods.mapOwnProperties(value => value + 10)).to.eql({
      a: 14,
      b: 18,
      c: 16,
    });

    expect(methods.someOwnProperty(value => value === 6)).to.be.true;
    expect(methods.someOwnProperty(value => value === 5)).to.be.false;
    expect(methods.everyOwnProperty(value => value < 9)).to.be.true;
    expect(methods.everyOwnProperty(value => value < 4)).to.be.false;
  });
});
