'use strict'

var interfaceObject = require('../interface/object')
var setPrototypeOf = require('./set-prototype')
var cleanStack = require('clean-stack')

function createFnTemplate (ErrorClass, interfaceString) {
  function tmpl (obj) {
    var error = new ErrorClass()
    if (typeof obj === 'object') interfaceObject(error, obj)
    else interfaceString(error, arguments)

    error.stack = cleanStack(error.stack)
    return error
  }
  return eval('(' + tmpl.toString().replace('tmpl', ErrorClass.name) + ')')
}

/**
 * Create an Error extending from interface Object or (configurable) String.
 */
function extendError (ErrorClass, interfaceString) {
  var Err = createFnTemplate(ErrorClass, interfaceString)
  setPrototypeOf(Err, ErrorClass.prototype)
  Err.prototype = ErrorClass.prototype
  return Err
}

module.exports = extendError
