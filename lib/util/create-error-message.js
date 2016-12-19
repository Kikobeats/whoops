'use strict'

function createErrorMessage (code, description) {
  return `${code}, ${description}`
}

module.exports = createErrorMessage
