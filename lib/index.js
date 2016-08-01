'use strict'

var createExtendError = require('./util/create-extend-error')
var createError = require('./util/create-error')

var whoops = createExtendError(Error)

whoops.create = function create (className) {
  var ErrorClass = createError(className)
  return createExtendError(ErrorClass)
}

module.exports = whoops
