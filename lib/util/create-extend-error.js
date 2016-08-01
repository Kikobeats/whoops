'use strict'

var interfaceObject = require('../interface/object')
var setPrototypeOf = require('./set-prototype')
var cleanStack = require('clean-stack')

/**
 * Create an Error extending from interface Object or (configurable) String.
 */
function createExtendError (ErrorClass, interfaceString) {
  function ExtendError (obj) {
    var error = new ErrorClass()
    if (typeof obj === 'object') interfaceObject(error, obj)
    else interfaceString(error, arguments)

    error.stack = cleanStack(error.stack)
    return error
  }

  setPrototypeOf(ExtendError, ErrorClass.prototype)
  ExtendError.prototype = ErrorClass.prototype
  return ExtendError
}

module.exports = createExtendError
