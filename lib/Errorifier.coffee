'use strict'

module.exports = class Errorifier

  constructor: (options) ->
    error = new Error()

    if typeof options is 'string'
      factory = @_composeMessageFromString
    else
      factory = @_composeMessageFromObject

    return factory error, options

  _composeMessageFromObject: (error, options) ->
    error[property] = value for property, value of options when property isnt 'message' or 'description'
    error.message = error.message or error.description
    return error unless error.message
    return error unless error.code
    error.message = "#{error.code}, #{error.message}"
    error

  _composeMessageFromString: (error, message) ->
    error.message = message
    messageSplit = message.split ','
    return error if messageSplit.length < 2
    error.code = messageSplit[0].trim()
    error
