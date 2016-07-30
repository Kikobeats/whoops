'use strict'

var interfaceString = require('./interface/string')
var extendError = require('./util/extend-error')
var createError = require('./util/create-error')

var whoops = extendError(Error, interfaceString)

whoops.create = function create (className) {
  var ErrorClass = createError(className)
  return extendError(ErrorClass, interfaceString)
}

module.exports = whoops
