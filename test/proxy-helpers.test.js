import makeTestFriendlyProxy from '../src/proxy-helpers';
import {expect} from 'chai';

describe('makeTestFriendlyProxy(obj)', function () {
  it('Using literal object', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy = makeTestFriendlyProxy(obj);

    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it('Using proxy of literal', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy0 = new Proxy(obj, {});
    const proxy = makeTestFriendlyProxy(proxy0);

    expect(proxy.snapshot()).to.eql(proxy0);
    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it('Using test-friendly proxy of literal', function () {
    const obj = {
      a: 1,
      b: 2,
    };

    const proxy0 = makeTestFriendlyProxy(obj);
    const proxy = makeTestFriendlyProxy(proxy0);

    expect(proxy.snapshot()).to.eql(proxy0);
    expect(proxy.snapshot()).to.eql(obj);

    proxy.c = 3;

    expect(proxy.snapshot()).to.eql({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
