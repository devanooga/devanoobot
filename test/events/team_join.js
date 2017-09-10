/* eslint-env node, mocha */
require('should')
const team_join = require('../../events/team_join')
var event

describe('events/team_join', () => {
  beforeEach(() => {
    event = {
      user: {
        name: 'testy_mctestface',
        profile: {
          first_name: 'Testy',
          last_name: 'McTestface',
        },
      },
    }
  })

  it('should set the username as the channel', done => {
    const result = team_join(event)

    result.channel.should.equal(event.user.name)
    done()
  })

  it('should return a welcome message', done => {
    const welcome_message = require('../../config/welcome_message')(event.user.profile.first_name)
    const result = team_join(event)

    result.text.should.equal(welcome_message)
    done()
  })

  it('should user the user’s handle if the name is not present', done => {
    delete event.user.profile.first_name
    const welcome_message = require('../../config/welcome_message')(event.user.name)
    const result = team_join(event)

    result.text.should.equal(welcome_message)
    done()
  })
})
