'use strict'

var whoops = require('./index')
var DAMNError = whoops.create('DAMNError')

// var err = DAMNError()

// console.log('static ::')
// console.log(DAMNError)
// console.log(DAMNError instanceof Error)
// console.log(typeof DAMNError)

console.log('instance ::')
console.log(DAMNError)
console.log(DAMNError('Something is wrong'))
console.log(DAMNError('Something is wrong') instanceof DAMNError)
