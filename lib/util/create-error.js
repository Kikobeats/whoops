'use strict'

var inherits = require('./inherits')

function createError (className) {
  if (typeof className !== 'string') throw new TypeError('Expected className to be a string')
  if (/[^0-9a-zA-Z_$]/.test(className)) throw new Error('className contains invalid characters')

  function ErrorClass () {
    Error.captureStackTrace(this, this.constructor)
  }

  Object.defineProperty(ErrorClass, 'name', {
    configurable: true,
    value: className,
    writable: true
  })

  inherits(ErrorClass, Error)
  ErrorClass.prototype.name = className
  return ErrorClass
}

module.exports = createError
