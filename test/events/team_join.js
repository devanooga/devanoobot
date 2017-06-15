var should = require('should');
var sinon = require('sinon');
require('should-sinon');

var team_join = require('../../functions/events/team_join');

describe('team_join', () => {
  it('should respond with a message for the member', (done) => {
    var callback = sinon.spy();
    var user = 'username';
    var event = {};

    team_join(user, null, null, event, null, callback);
    callback.should.be.calledOnce();
    callback.args[0][1].channel.should.be.equal(user);
    callback.args[0][1].should.be.instanceOf(Object);
    callback.args[0][1].text.should.be.instanceOf(String);

    done();
  });
});
