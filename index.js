'use strict'

var FACTORY = {
  OBJECT: function (error, fields) {
    var property, value
    for (property in fields) {
      value = fields[property]
      error[property] = value
    }
    if (error.code) {
      error.message = error.code + ', ' + error.message
    }
    return error
  },

  STRING: function (error, args) {
    var argsSize = {
      3: function () {
        error.name = args[0]
        error.code = args[1]
        return error.message = error.code + ', ' + args[2]
      },
      2: function () {
        error.name = args[0]
        return error.message = args[1]
      },
      1: function () {
        return error.message = args[0]
      },
      0: function () {}
    }
    argsSize[args.length]()
    return error
  }
}

module.exports = function (type) {
  var error = Error()
  if (typeof type === 'object') return FACTORY.OBJECT(error, type)
  return FACTORY.STRING(error, arguments)
}
