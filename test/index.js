'use strict'

const { describe, it } = require('node:test')

const whoops = require('..')

describe('constructor', () => {
  ;[
    [Error, whoops],
    [TypeError, whoops.type],
    [RangeError, whoops.range],
    [EvalError, whoops.eval],
    [SyntaxError, whoops.syntax],
    [ReferenceError, whoops.reference],
    [URIError, whoops.uri]
  ].forEach(([ErrorClass, whoops]) => {
    describe(ErrorClass.name, () => {
      ;[
        { name: 'without providing a class name', input: undefined },
        { name: 'providing a class name', input: 'UserError' }
      ].forEach(({ name, input }) => {
        it(name, t => {
          const userError = whoops(input)
          t.assert.equal(typeof userError, 'function')
          t.assert.equal(userError.name, input || ErrorClass.name)
          const error = userError()
          t.assert.equal(error.name, input || ErrorClass.name)
          t.assert.equal(error.constructor.name, input || ErrorClass.name)
          t.assert.equal(error.message, undefined)
          t.assert.equal(userError().description, undefined)
          t.assert.equal(userError().code, undefined)
          t.assert.equal(userError() instanceof userError, true)
          t.assert.equal(userError() instanceof ErrorClass, true)
        })
      })
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
      const userError = whoops('UserError', {
        message: ({ username }) => `user '${username}' not found`,
        code: 'ENOVALID'
      })

      const error = userError({ username: 'kikobeats' })

      t.assert.equal(error.message, "ENOVALID, user 'kikobeats' not found")
      t.assert.equal(error.code, 'ENOVALID')
      t.assert.equal(error.description, "user 'kikobeats' not found")

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

    describe('passing cause prop', () => {
      it('with Error object as cause', t => {
        const userError = whoops('UserError')
        const originalError = new Error('original error')
        const error = userError({
          message: 'user not found',
          cause: originalError
        })
        t.assert.equal(error instanceof userError, true)
        t.assert.equal(error instanceof Error, true)
        t.assert.equal(error.message, 'user not found')
        t.assert.equal(error.cause, originalError)
        t.assert.equal(error.cause.message, 'original error')
      })

      it('with cause and code', t => {
        const userError = whoops('UserError')
        const originalError = new Error('database connection failed')
        const error = userError({
          message: 'user not found',
          code: 'ENOVALID',
          cause: originalError
        })
        t.assert.equal(error.message, 'ENOVALID, user not found')
        t.assert.equal(error.code, 'ENOVALID')
        t.assert.equal(error.cause, originalError)
        t.assert.equal(error.cause.message, 'database connection failed')
      })

      it('with cause in defaults', t => {
        const originalError = new Error('default cause')
        const userError = whoops('UserError', {
          code: 'ENOVALID',
          cause: originalError
        })
        const error = userError({ message: 'user not found' })
        t.assert.equal(error.message, 'ENOVALID, user not found')
        t.assert.equal(error.code, 'ENOVALID')
        t.assert.equal(error.cause, originalError)
        t.assert.equal(error.cause.message, 'default cause')
      })

      it('with cause overridden in instance', t => {
        const defaultCause = new Error('default cause')
        const instanceCause = new Error('instance cause')
        const userError = whoops('UserError', {
          code: 'ENOVALID',
          cause: defaultCause
        })
        const error = userError({
          message: 'user not found',
          cause: instanceCause
        })
        t.assert.equal(error.message, 'ENOVALID, user not found')
        t.assert.equal(error.code, 'ENOVALID')
        t.assert.equal(error.cause, instanceCause)
        t.assert.equal(error.cause.message, 'instance cause')
      })
      ;[
        [Error, whoops],
        [TypeError, whoops.type],
        [RangeError, whoops.range],
        [EvalError, whoops.eval],
        [SyntaxError, whoops.syntax],
        [ReferenceError, whoops.reference],
        [URIError, whoops.uri]
      ].forEach(([ErrorClass, whoops]) => {
        it(`works with ${ErrorClass.name}`, t => {
          const customError = whoops('CustomError')
          const originalError = new Error('original error')
          const error = customError({
            message: 'custom error message',
            cause: originalError
          })
          t.assert.equal(error instanceof customError, true)
          t.assert.equal(error instanceof ErrorClass, true)
          t.assert.equal(error.cause, originalError)
          t.assert.equal(error.cause.message, 'original error')
        })
      })
    })
  })
})
