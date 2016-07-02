'use strict'

function noop () {}

/**
 * Extend a Error object from a String interface.
 *
 * This interface accepts 3 arguments:
 *  - name [optional]
 *  - code [optional]
 *  - message
 *
 * 	Arguments are binds. Only the message is a configurable field.
 *
 * @param  {Object} error  base object
 * @param  {Object} fields assignment fields
 */
function interfaceString (error, args) {
  var fn = {
    3: function () {
      error.name = args[0]
      error.code = args[1]
      error.message = error.code + ', ' + args[2]
    },
    2: function () {
      error.name = args[0]
      error.message = args[1]
    },
    1: function () {
      error.message = args[0]
    },
    0: noop
  }
  fn[args.length]()
}

module.exports = interfaceString
