import makeLoopMethods from '../src/make-loop-methods';
import {expect} from 'chai';

describe('makeLoopMethods(obj, keys, names)', function () {
  it('Using literal obj, Object.keys and no names', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const methods = makeLoopMethods(obj, 'keys');

    expect(methods.keys()).to.eql(['a', 'b']);

    methods.forEach((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      b: 4,
    });

    expect(methods.map(value => value + 10)).to.eql({
      a: 12,
      b: 14,
    });

    expect(methods.some(value => value === 2)).to.be.true;
    expect(methods.some(value => value === 5)).to.be.false;
    expect(methods.every(value => value < 5)).to.be.true;
    expect(methods.every(value => value < 4)).to.be.false;
  });

  it('Using literal obj, Object.keys and names', function () {
    const obj = {
      a: 1,
      b: 2,
    };
    const names = {
      keys: 'ownProperties',
      forEach: 'forEachOwnProperty',
      map: 'mapOwnProperties',
      some: 'someOwnProperty',
      every: 'everyOwnProperty',
    };

    const methods = makeLoopMethods(obj, 'keys', names);

    expect(methods.ownProperties()).to.eql(['a', 'b']);

    methods.forEachOwnProperty((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      b: 4,
    });

    expect(methods.mapOwnProperties(value => value + 10)).to.eql({
      a: 12,
      b: 14,
    });

    expect(methods.someOwnProperty(value => value === 2)).to.be.true;
    expect(methods.someOwnProperty(value => value === 5)).to.be.false;
    expect(methods.everyOwnProperty(value => value < 5)).to.be.true;
    expect(methods.everyOwnProperty(value => value < 4)).to.be.false;
  });

  it('Using obj, Object.keys and no names', function () {
    const obj = Object.create(null, {
      b: {
        value: 2,
      },
    });
    obj.a = 1;
    obj.c = 3;

    const methods = makeLoopMethods(obj, 'keys');

    expect(methods.keys()).to.eql(['a', 'c']);

    methods.forEach((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      c: 6,
    });

    expect(methods.map(value => value + 10)).to.eql({
      a: 12,
      c: 16,
    });

    expect(methods.some(value => value === 2)).to.be.true;
    expect(methods.some(value => value === 4)).to.be.false;
    expect(methods.every(value => value < 7)).to.be.true;
    expect(methods.every(value => value < 3)).to.be.false;
  });

  it('Using obj, Object.getOwnPropertyNames and no names', function () {
    const obj = Object.create(null, {
      b: {
        value: 2,
        writable: true,
      },
    });
    obj.a = 1;
    obj.c = 3;

    const methods = makeLoopMethods(obj, 'getOwnPropertyNames');

    expect(methods.keys()).to.eql(['b', 'a', 'c']);

    methods.forEach((value, key, obj) => {
      obj[key] = 2 * value; // eslint-disable-line no-param-reassign
    });

    expect(obj).to.eql({
      a: 2,
      c: 6,
    });
    expect(obj.b).to.equal(4);

    expect(methods.map(value => value + 10)).to.eql({
      a: 12,
      b: 14,
      c: 16,
    });

    expect(methods.some(value => value === 4)).to.be.true;
    expect(methods.some(value => value === 5)).to.be.false;
    expect(methods.every(value => value < 7)).to.be.true;
    expect(methods.every(value => value < 3)).to.be.false;
  });
});
