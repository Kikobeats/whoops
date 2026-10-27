'use strict'

function createErrorClass (ErrorClass) {
  return (name, defaults) => {
    const assignProps = (error, raw) => {
      const { message, ...props } = Object.assign(
        {},
        defaults,
        typeof raw === 'string' ? { message: raw } : raw
      )
      Object.keys(props).forEach(key => (error[key] = props[key]))
      if (message) error.description = typeof message === 'function' ? message(props) : message
      error.message = error.code ? `${error.code}, ${error.description}` : error.description
      error.name = name || ErrorClass.name
      return error
    }

    class CustomError extends ErrorClass {
      constructor (raw = {}) {
        super(raw)
        assignProps(this, raw)
      }
    }

    Object.defineProperty(CustomError, 'name', {
      value: name || ErrorClass.name,
      writable: false
    })

    // Function to create an instance, allowing use without `new`
    function CustomErrorFactory (raw = {}) {
      return assignProps(Object.setPrototypeOf(new ErrorClass(raw), CustomError.prototype), raw)
    }

    // Ensure the function's name matches the class name for consistency
    Object.defineProperty(CustomErrorFactory, 'name', {
      value: name || ErrorClass.name,
      writable: false
    })

    // Make `instanceof` checks work with both the class and factory
    CustomErrorFactory.prototype = CustomError.prototype

    return CustomErrorFactory
  }
}

module.exports = createErrorClass(Error)
module.exports.type = createErrorClass(TypeError)
module.exports.range = createErrorClass(RangeError)
module.exports.eval = createErrorClass(EvalError)
module.exports.syntax = createErrorClass(SyntaxError)
module.exports.reference = createErrorClass(ReferenceError)
module.exports.uri = createErrorClass(URIError)
