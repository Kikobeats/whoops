'use strict'

var interfaceObject = require('../interface/object')
var setPrototypeOf = require('./set-prototype')
var cleanStack = require('clean-stack')

/**
 * Create an Error extending from interface Object or (configurable) String.
 */
function extendError (ErrorClass, interfaceString) {
  function Err (obj) {
    var error = new ErrorClass()
    if (typeof obj === 'object') interfaceObject(error, obj)
    else interfaceString(error, arguments)

    error.stack = cleanStack(error.stack)
    return error
  }

  Object.defineProperty(Err, 'name', {
    configurable: true,
    value: ErrorClass.name,
    writable: true
  })

  setPrototypeOf(Err, ErrorClass.prototype)
  Err.prototype = ErrorClass.prototype
  return Err
}

module.exports = extendError
