'use strict'

const cleanStack = require('clean-stack')
const mimicFn = require('mimic-fn')

const addErrorProps = require('./add-error-props')
const { isString } = require('./helpers')

function createExtendError (ErrorClass, classProps) {
  function ExtendError (props) {
    const error = new ErrorClass()
    const errorProps = isString(props) ? { message: props } : props
    addErrorProps(error, classProps, errorProps)

    error.stack = typeof error.stack === 'string' ? cleanStack(error.stack) : undefined
    return error
  }

  ExtendError.prototype = ErrorClass.prototype
  mimicFn(ExtendError, ErrorClass)

  return ExtendError
}

module.exports = createExtendError
