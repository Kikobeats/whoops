'use strict'

function createErrorClass (ErrorClass) {
  return (name, defaults) => {
    class CustomError extends ErrorClass {
      constructor (raw = {}) {
        super(raw)
        const { message, ...props } = Object.assign(
          {},
          defaults,
          typeof raw === 'string' ? { message: raw } : raw
        )
        Object.keys(props).forEach(key => (this[key] = props[key]))
        if (message) this.description = typeof message === 'function' ? message(props) : message
        this.message = this.code ? `${this.code}, ${this.description}` : this.description
        this.name = name || ErrorClass.name
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
