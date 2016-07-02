'use strict'

/**
 * Create an Error from an Object Interface.
 * @param  {Object} error  base object
 * @param  {Object} fields assignment fields
 */
function interfaceObject (error, fields) {
  Object.keys(fields).forEach(function (key) {
    error[key] = fields[key]
  })

  if (typeof error.message === 'function') error.message = error.message()
  if (error.code) error.message = error.code + ', ' + error.message
}

module.exports = interfaceObject
