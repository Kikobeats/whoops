'use strict'

module.exports = class Whoops

  constructor: (type) ->
    error = new Error()
    return @_composeMessageFromObject error, type if typeof type is 'object'
    return @_composeMessageFromString error, arguments

  _composeMessageFromObject: (error, fields) ->
    error[property] = value for property, value of fields
    error.message = "#{error.code}, #{error.message}" if error.code
    error

  _composeMessageFromString: (error, args) ->

    argsSize =
      3: ->
        error.name = args[0]
        error.code = args[1]
        error.message = "#{error.code}, #{args[2]}"
      2: ->
        error.name = args[0]
        error.message = args[1]
      1: ->
        error.message = args[0]
      0: ->

    argsSize[args.length]()
    error
