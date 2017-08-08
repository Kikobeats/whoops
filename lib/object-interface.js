'use strict'

const {isFunction, composeErrorMessage} = require('./helpers')

function interfaceObject (error, fields) {
  Object.assign(error, fields)

  error.description = isFunction(error.message) ? error.message(error) : error.message

  error.message = error.code
   ? composeErrorMessage(error.code, error.description)
   : error.description
}

module.exports = interfaceObject
