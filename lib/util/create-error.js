'use strict'

var inherits = require('./inherits')

function createFnTemplate (className) {
  function tmpl () {
    Error.captureStackTrace(this, this.constructor)
  }
  return eval('(' + tmpl.toString().replace('tmpl', className) + ')')
}

function createError (className) {
  if (typeof className !== 'string') throw new TypeError('Expected className to be a string')
  if (/[^0-9a-zA-Z_$]/.test(className)) throw new Error('className contains invalid characters')

  var ErrorClass = createFnTemplate(className)
  inherits(ErrorClass, Error)
  ErrorClass.prototype.name = className
  return ErrorClass
}

module.exports = createError
