'use strict'

var whoops = require('..')
var DAMNError = whoops.create('DAMNError')
var err = DAMNError('Something is wrong')

console.log('static ::')
console.log(DAMNError)
console.log('DAMNError instanceof Error?', DAMNError instanceof Error)
console.log()
console.log('instance ::')
console.log(err)
console.log('err instanceof Error?', err instanceof Error)
console.log('err instanceof DAMNError?', err instanceof Error)
