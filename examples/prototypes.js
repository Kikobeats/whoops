'use strict'

const whoops = require('..')
const DAMNError = whoops.create('DAMNError')
const err = DAMNError('Something is wrong')

console.log('static ::')
console.log(DAMNError)
console.log('DAMNError instanceof Error?', DAMNError instanceof Error)
console.log()
console.log('instance ::')
console.log(err)
console.log('err instanceof Error?', err instanceof Error)
console.log('err instanceof DAMNError?', err instanceof Error)
