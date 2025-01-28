'use strict'

function createErrorClass (ErrorClass) {
  return (name, defaults) => {
    class CustomError extends ErrorClass {
      constructor (raw = {}) {
        super(raw)

        const { message, ...props } = typeof raw === 'string' ? { message: raw } : raw
        const mergedProps = Object.assign({}, defaults, props)
        Object.keys(mergedProps).forEach(key => (this[key] = mergedProps[key]))

        this.description = typeof message === 'function' ? message(this) : message
        this.message = this.code ? `${this.code}, ${this.description}` : this.description
        this.name = name || ErrorClass.name

        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CustomError)
        }
      }
    }

    // Function to create an instance, allowing use without `new`
    function CustomErrorFactory (props) {
      return new CustomError(props)
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
