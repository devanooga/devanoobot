/* eslint-env node, mocha */
const cryptovalue = require('../../commands/cryptovalue');
const sinon = require('sinon');
require('should');

describe('commands/cryptovalue', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        text: 'bitcoin',
      },
    }

    res = {
      send: sinon.spy(),
    }

    next = sinon.spy();
  });

  it('should do a thing', () => {
    cryptovalue(req, res, next).then(() => {
      res.send.calledOnce.should.equal.true;
      res.send.calledWith({
        response_type: 'in_channel',
        text: 'Bitcoin (BTC) - $',
      });
    });
  });
});