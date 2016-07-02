'use strict'

var setPrototypeOf = require('./set-prototype')
var interfaceObject = require('../interface/object')

/**
 * Create an Error extending from interface Object or (configurable) String.
 *
 */
function extendError (ErrorClass, interfaceString) {
  var className = ErrorClass.name
  var Err = eval('(function ' + className + " (type) { var error = new ErrorClass(); if (typeof type === 'object') { interfaceObject(error, type) } else { interfaceString(error, arguments) } return error; })")
  setPrototypeOf(Err, ErrorClass.prototype)
  Err.prototype = ErrorClass.prototype
  return Err
}

module.exports = extendError
