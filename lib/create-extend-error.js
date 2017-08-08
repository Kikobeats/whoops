'use strict'

const interfaceObject = require('./object-interface')
const cleanStack = require('clean-stack')
const mimicFn = require('mimic-fn')
const {isString} = require('./helpers')

function createExtendError (ErrorClass) {
  function ExtendError (props) {
    const error = new ErrorClass()
    const errorProps = isString(props) ? {message: props} : props
    interfaceObject(error, errorProps)

    error.stack = cleanStack(error.stack)
    return error
  }

  ExtendError.prototype = ErrorClass.prototype
  mimicFn(ExtendError, ErrorClass)

  return ExtendError
}

module.exports = createExtendError
