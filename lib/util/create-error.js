'use strict'

var inherits = require('./inherits')
var captureStackTrace = require('capture-stack-trace')

function createError (className) {
  if (typeof className !== 'string') throw new TypeError('Expected className to be a string')
  if (/[^0-9a-zA-Z_$]/.test(className)) throw new Error('className contains invalid characters')

  var ErrorClass = eval('(function ' + className + '() { captureStackTrace(this, this.constructor); })')
  inherits(ErrorClass, Error)
  ErrorClass.prototype.name = className
  return ErrorClass
}

module.exports = createError
