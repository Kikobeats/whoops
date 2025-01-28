'use strict'

const { describe, it } = require('node:test')

const whoops = require('..')

describe('constructor', () => {
  describe('Error', () => {
    it('without providing a class name', t => {
      const userError = whoops()
      t.assert.equal(typeof userError, 'function')
      t.assert.equal(userError.name, Error.name)
      t.assert.equal(userError().name, 'Error')
    })

    it('providing a class name', t => {
      const userError = whoops('UserError')
      t.assert.equal(typeof userError, 'function')
      t.assert.equal(userError.name, 'UserError')
      t.assert.equal(userError().name, 'UserError')
    })
  })

  it('attach props', t => {
    const userError = whoops('UserError', { code: 'ENOVALID' })
    t.assert.equal(typeof userError, 'function')
    t.assert.equal(userError.name, 'UserError')
    const error = userError({ message: 'user not found' })
    t.assert.equal(error.message, 'ENOVALID, user not found')
    t.assert.equal(error.code, 'ENOVALID')
    t.assert.equal(error.description, 'user not found')
  })

  describe('instance', () => {
    describe('passing message prop', () => {
      it('as string', t => {
        t.plan(4)
        const userError = whoops('UserError')
        const error = userError('user not found')
        t.assert.equal(error instanceof userError, true)
        t.assert.equal(error instanceof Error, true)
        t.assert.equal(error.message, 'user not found')
        t.assert.equal(error.description, 'user not found')
      })

      it('as object', t => {
        const userError = whoops('UserError')
        const error = userError({ message: 'user not found' })
        t.assert.equal(error instanceof userError, true)
        t.assert.equal(error instanceof Error, true)
        t.assert.equal(error.message, 'user not found')
        t.assert.equal(error.description, 'user not found')
      })
    })

    it('passing message & code props', t => {
      const userError = whoops('UserError')
      const error = userError({ message: 'user not found', code: 'ENOVALID' })
      t.assert.equal(error instanceof userError, true)
      t.assert.equal(error instanceof Error, true)
    })

    it('passing message, code & extra props', t => {
      const userError = whoops('UserError')
      const error = userError({
        username: 'kikobeats',
        message: props => `user '${props.username}' not found`,
        code: 'ENOVALID'
      })
      t.assert.equal(error instanceof userError, true)
      t.assert.equal(error instanceof Error, true)
      t.assert.equal(error.message, "ENOVALID, user 'kikobeats' not found")
      t.assert.equal(error.code, 'ENOVALID')
      t.assert.equal(error.description, "user 'kikobeats' not found")
      t.assert.equal(error.username, 'kikobeats')
    })
  })
})
