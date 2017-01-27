import Muter, {captured} from 'muter';
import {expect} from 'chai';
import ProxyHelpers from '../src/proxy-helpers';

describe('Testing ProxyHelpers', function() {

  const muter = Muter(console, 'log');

  it(`Class ProxyHelpers says 'Hello!'`, captured(muter, function() {
    new ProxyHelpers();
    expect(muter.getLogs()).to.equal('Hello!\n');
  }));

});
