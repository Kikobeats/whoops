'use strict'

var inherits = require('./inherits')

function createError (className) {
  if (typeof className !== 'string') throw new TypeError('Expected className to be a string')
  if (/[^0-9a-zA-Z_$]/.test(className)) throw new Error('className contains invalid characters')

  function ErrorClass () {
    Object.defineProperty(this, 'name', {
      configurable: true,
      value: className,
      writable: true
    })

    Error.captureStackTrace(this, this.constructor)
  }

  inherits(ErrorClass, Error)
  return ErrorClass
}

module.exports = createError
