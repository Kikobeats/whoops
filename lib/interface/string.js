'use strict'

const noop = require('../util/noop')
const createErrorMessage = require('../util/create-error-message')

/**
 * Similar to String interface, but only accept two arguments:
 *  - code [optional]
 *  - message
 */
function interfaceStringFactory (error, args) {
  const fn = {
    2: function () {
      error.code = args[0]
      error.description = args[1]
      error.message = createErrorMessage(error.code, error.description)
    },
    1: function () {
      error.message = args[0]
      error.description = args[0]
    },
    0: noop
  }

  fn[args.length]()
}

module.exports = interfaceStringFactory
