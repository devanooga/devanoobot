var should = require('should');
var sinon = require('sinon');
require('should-sinon');

var team_join = require('../../functions/events/team_join');

describe('team_join', () => {
  it('should respond with a message for the member', (done) => {
    var callback = sinon.spy();
    var user = {
      name: 'username'
    }
    var event = {}

    team_join(user, null, null, event, null, callback);
    callback.should.be.calledOnce();
    callback.getArgs().args.should.deepEqual([
      null, {
        test: `Hello, ${user.name}!`
      }
    ]);

    done();
  });
});
