'use strict'

var interfaceString = require('./interface/string')
var createExtendError = require('./util/create-extend-error')
var createError = require('./util/create-error')

var whoops = createExtendError(Error, interfaceString)

whoops.create = function create (className) {
  var ErrorClass = createError(className)
  return createExtendError(ErrorClass, interfaceString)
}

module.exports = whoops
