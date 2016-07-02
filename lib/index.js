'use strict'

var interfaceStringFactory = require('./interface/string-factory')
var interfaceString = require('./interface/string')
var extendError = require('./util/extend-error')
var createError = require('./util/create-error')

var whoops = extendError(Error, interfaceString)

whoops.create = function create (className) {
  var ErrorClass = createError(className)
  return extendError(ErrorClass, interfaceStringFactory)
}

module.exports = whoops
