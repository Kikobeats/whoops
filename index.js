'use strict'

var captureStackTrace = require('capture-stack-trace')

function noop () {}

function inherits (ctor, superCtor) {
  ctor.super_ = superCtor
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
}

var FACTORY = {
  OBJECT: function (error, fields) {
    Object.keys(fields).forEach(function (key) {
      var value = fields[key]
      error[key] = value
    })

    if (typeof error.message === 'function') error.message = error.message()
    if (error.code) error.message = error.code + ', ' + error.message
  },

  STRING: function (error, args) {
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
  },

  STRING_NONAME: function (error, args) {
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
}

function Factory (ErrorClass, factoryString) {
  function F (type) {
    var error = new ErrorClass()
    if (typeof type === 'object') FACTORY.OBJECT(error, type)
    else factoryString(error, arguments)
    return error
  }

  F.__proto__ = ErrorClass.prototype
  F.prototype = ErrorClass.prototype
  return F
}

module.exports = Factory(Error, FACTORY.STRING)

module.exports.create = function (className) {
  if (typeof className !== 'string') throw new TypeError('Expected className to be a string')
  if (/[^0-9a-zA-Z_$]/.test(className)) throw new Error('className contains invalid characters')

  var ErrorClass = eval('(function ' + className + '() { captureStackTrace(this, this.constructor); })')
  inherits(ErrorClass, Error)
  ErrorClass.prototype.name = className
  return Factory(ErrorClass, FACTORY.STRING_NONAME)
}
