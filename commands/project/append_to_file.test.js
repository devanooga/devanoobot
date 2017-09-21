/* eslint-env mocha */

const sinon = require('sinon')
require('should')
require('should-sinon')

const proxyquire = require('proxyquire')

describe('/append_to_file', done => {
  var data, spy, append_to_file

  beforeEach(() => {
    data = {
      filepath: 'some/contrived/file/path.js',
      text: 'Some dummy text goes here.',
    }

    spy = sinon.spy(() => Promise.resolve())

    append_to_file = proxyquire('./append_to_file', {
      util: {
        promisify: () => {
          return spy
        },
      },
    })
  })

  it('should return a promise', done => {
    let result = append_to_file(data)
    result.should.be.instanceOf(Promise)
    done()
  })

  it('should append invoke fs.appendFile() with the correct text', async () => {
    await append_to_file(data)
      .then(() => {
        spy.should.be.calledWith(data.filepath, data.text, 'utf-8')
      })
      .then(done).catch(done)
  })
})
