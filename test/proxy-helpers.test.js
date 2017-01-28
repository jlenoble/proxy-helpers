import makeProxy from '../src/proxy-helpers';
import {expect} from 'chai';

describe('makeProxy(obj)', function () {
  it('Using literal object', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy = makeProxy(obj);

    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(proxy.equiv({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;

    expect(proxy.equivOwnProperties({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;
  });

  it('Using proxy of literal', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy0 = new Proxy(obj, {});
    const proxy = makeProxy(proxy0);

    expect(proxy.snapshot()).to.eql(proxy0);
    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(proxy.equiv({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;

    expect(proxy.equivOwnProperties({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;
  });

  it('Using test-friendly proxy of literal', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy0 = makeProxy(obj);
    const proxy = makeProxy(proxy0);

    expect(proxy.snapshot()).to.eql(proxy0);
    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(proxy.equiv({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;

    expect(proxy.equivOwnProperties({
      a: 1,
      b: 2,
      c: 3,
    })).to.be.true;
  });
});
