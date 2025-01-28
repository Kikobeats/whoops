'use strict'

const { describe, it } = require('node:test')

const whoops = require('..')

describe('whoops', t => {
  describe('constructor', () => {
    describe('Error', () => {
      it('without providing a class name', t => {
        const userError = whoops()
        t.assert.equal(typeof userError, 'function')
        t.assert.equal(userError.name, Error.name)
      })

      it('providing a class name', t => {
        const userError = whoops('UserError')
        t.assert.equal(typeof userError, 'function')
        t.assert.equal(userError.name, 'UserError')
      })
    })

    it('attach props', t => {
      t.plan(5)

      const userError = whoops('UserError', { code: 'ENOVALID' })
      t.assert.equal(typeof userError, 'function')
      t.assert.equal(userError.name, 'UserError')

      try {
        throw userError({ message: 'user not found' })
      } catch (err) {
        t.assert.equal(err.message, 'ENOVALID, user not found')
        t.assert.equal(err.code, 'ENOVALID')
        t.assert.equal(err.description, 'user not found')
      }
    })

    describe('instance', () => {
      describe('passing message prop', () => {
        it('as string', t => {
          t.plan(4)
          const userError = whoops('UserError')
          try {
            throw userError('user not found')
          } catch (err) {
            t.assert.equal(err instanceof userError, true)
            t.assert.equal(err instanceof Error, true)
            t.assert.equal(err.message, 'user not found')
            t.assert.equal(err.description, 'user not found')
          }
        })

        it('as object', t => {
          const userError = whoops('UserError')
          try {
            throw userError({ message: 'user not found' })
          } catch (err) {
            t.assert.equal(err instanceof userError, true)
            t.assert.equal(err instanceof Error, true)

            t.assert.equal(err.message, 'user not found')
            t.assert.equal(err.description, 'user not found')
          }
        })
      })

      it('passing message & code props', t => {
        const userError = whoops('UserError')
        try {
          throw userError({ message: 'user not found', code: 'ENOVALID' })
        } catch (err) {
          t.assert.equal(err instanceof userError, true)
          t.assert.equal(err instanceof Error, true)
        }
      })

      it('passing message, code & extra props', t => {
        const userError = whoops('UserError')
        try {
          throw userError({
            username: 'kikobeats',
            message: props => `user '${props.username}' not found`,
            code: 'ENOVALID'
          })
        } catch (err) {
          t.assert.equal(err instanceof userError, true)
          t.assert.equal(err instanceof Error, true)

          t.assert.equal(err.message, "ENOVALID, user 'kikobeats' not found")
          t.assert.equal(err.code, 'ENOVALID')
          t.assert.equal(err.description, "user 'kikobeats' not found")
          t.assert.equal(err.username, 'kikobeats')
        }
      })
    })
  })
})
