'use strict'

var noop = require('../util/noop')

/**
 * Similar to String interface, but only accept two arguments:
 *  - code [optional]
 *  - message
 */
function interfaceStringFactory (error, args) {
  var fn = {
    2: function () {
      error.code = args[0]
      error.message = error.code + ', ' + args[1]
    },
    1: function () {
      error.message = args[0]
    },
    0: noop
  }

  fn[args.length]()
}

module.exports = interfaceStringFactory
