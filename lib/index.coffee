'use strict'

composeFromObject = (error, fields) ->
  error[property] = value for property, value of fields
  error.message = "#{error.code}, #{error.message}" if error.code
  error

composeFromString = (error, args) ->
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

module.exports = (type) ->
  error = Error()
  return composeFromObject error, type if typeof type is 'object'
  composeFromString error, arguments
