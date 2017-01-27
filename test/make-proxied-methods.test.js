import isEnumerable from '../src/is-enumerable';
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

  it('Testing is methods', function () {
    const obj = {
      a: 1,
      b: 2,
    };
    Object.defineProperty(obj, 'c', {
      value: 3,
      writable: true,
    });

    const methods = makeProxiedMethods(obj);

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

  it('Testing snapshot methods', function () {
    const obj = {
      a: 1,
      b: {
        d: {
          f: 4,
        },
      },
    };
    Object.defineProperty(obj.b, 'c', {
      value: 2,
      writable: true,
    });
    Object.defineProperty(obj.b.d, 'e', {
      value: 3,
      writable: true,
    });

    const methods = makeProxiedMethods(obj);

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
        d: {
          f: 8,
        },
      },
    });
    expect(obj.b.c).to.equal(2);
    expect(obj.b.d.e).to.equal(3);

    expect(s).not.to.eql(obj);

    s = methods.snapshot();

    expect(s).to.eql(obj);

    s = methods.snapshotOwnProperties();

    expect(s).to.eql({
      a: 2,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 8,
        },
      },
    });

    const func2 = (x, key, obj) => {
      if (isEnumerable(x)) {
        Object.getOwnPropertyNames(x).forEach(key => {
          func2(x[key], key, x);
        });
      } else {
        obj[key] = 2 * x; // eslint-disable-line no-param-reassign
      }
    };

    methods.forEach(func2);

    expect(obj).to.eql({
      a: 4,
      b: {
        d: {
          f: 16,
        },
      },
    });
    expect(obj.b.c).to.equal(4);
    expect(obj.b.d.e).to.equal(6);

    expect(s).not.to.eql({
      a: 4,
      b: {
        c: 4,
        d: {
          e: 6,
          f: 16,
        },
      },
    });

    s = methods.snapshotOwnProperties();

    expect(s).to.eql({
      a: 4,
      b: {
        c: 4,
        d: {
          e: 6,
          f: 16,
        },
      },
    });
  });

  it('Testing equiv methods', function () {
    const obj = {
      a: 1,
      b: {
        d: {
          f: 4,
        },
      },
    };
    Object.defineProperty(obj.b, 'c', {
      value: 2,
      writable: true,
    });
    Object.defineProperty(obj.b.d, 'e', {
      value: 3,
      writable: true,
    });

    const methods = makeProxiedMethods(obj);

    expect(methods.equiv({
      a: 1,
      b: {
        d: {
          f: 4,
        },
      },
    })).to.be.true;

    expect(methods.equivOwnProperties({
      a: 1,
      b: {
        d: {
          f: 4,
        },
      },
    })).to.be.false;

    expect(methods.equivOwnProperties( {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4,
        },
      },
    })).to.be.true;
  });
});
