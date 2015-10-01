'use strict'

format = require 'format'

module.exports = class Errorifier

  constructor: (options) ->
    error = new Error()

    if typeof options is 'string'
      return @_composeMessageFromString error, arguments
    else
      return @_composeMessageFromObject error, options

  _composeMessageFromObject: (error, options) ->
    error[property] = value for property, value of options when property isnt 'message' or 'description'
    error.message = error.message or error.description
    return error unless error.message
    return error unless error.code
    error.message = "#{error.code}, #{error.message}"
    error

  _composeMessageFromString: (error, args) ->
    error.message = format.apply null, args
    messageSplit = error.message.split ', '
    return error if messageSplit.length < 2
    error.code = messageSplit[0].trim()
    error
