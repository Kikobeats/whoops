'use strict'

const isFunction = require('../util/is-function')
const createErrorMessage = require('../util/create-error-message')

/**
 * Create an Error from an Object Interface.
 * @param  {Object} error  base object
 * @param  {Object} fields assignment fields
 */
function interfaceObject (error, fields) {
  Object.keys(fields).forEach(key => error[key] = fields[key])
  error.description = !isFunction(error.message) ? error.message : error.message()
  if (error.code) error.message = createErrorMessage(error.code, error.description)
  else error.message = error.description
}

module.exports = interfaceObject
