const should = require('should')
const whoops = require('..')

describe('whoops', function () {
  describe('constructor', function () {
    describe('Error', function () {
      it('without providing a class name', function () {
        const userError = whoops()
        should(userError).be.a.Function()
        should(userError.name).be.equal(Error.name)
      })

      it('providing a class name', function () {
        const userError = whoops('UserError')
        should(userError).be.a.Function()
        should(userError.name).be.equal('UserError')
      })
    })

    it('attach props', function () {
      const userError = whoops('UserError', { code: 'ENOVALID' })

      should(userError).be.a.Function()
      should(userError.name).be.equal('UserError')

      try {
        throw userError({ message: 'user not found' })
      } catch (err) {
        should(err.message).be.equal('ENOVALID, user not found')
        should(err.code).be.equal('ENOVALID')
        should(err.description).be.equal('user not found')
      }
    })
  })

  describe('instance', function () {
    describe('passing message prop', function () {
      it('as string', function () {
        const userError = whoops('UserError')
        try {
          throw userError('user not found')
        } catch (err) {
          should(err).instanceof(userError)
          should(err).instanceof(Error)

          should(err.message).be.equal('user not found')
          should(err.description).be.equal('user not found')
        }
      })

      it('as object', function () {
        const userError = whoops('UserError')
        try {
          throw userError({ message: 'user not found' })
        } catch (err) {
          should(err).instanceof(userError)
          should(err).instanceof(Error)

          should(err.message).be.equal('user not found')
          should(err.description).be.equal('user not found')
        }
      })
    })

    it('passing message & code props', function () {
      const userError = whoops('UserError')
      try {
        throw userError({ message: 'user not found', code: 'ENOVALID' })
      } catch (err) {
        should(err).instanceof(userError)
        should(err).instanceof(Error)
      }
    })

    it('passing message, code & extra props', function () {
      const userError = whoops('UserError')
      try {
        throw userError({
          username: 'kikobeats',
          message: props => `user '${props.username}' not found`,
          code: 'ENOVALID'
        })
      } catch (err) {
        should(err).instanceof(userError)
        should(err).instanceof(Error)

        should(err.message).be.equal("ENOVALID, user 'kikobeats' not found")
        should(err.code).be.equal('ENOVALID')
        should(err.description).be.equal("user 'kikobeats' not found")
        should(err.username).be.equal('kikobeats')
      }
    })
  })
})
