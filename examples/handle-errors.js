'use strict'

const fs = require('fs')
const Whoops = require('..')

console.log('\n[ Standard NodeJS errors ]\n')

try {
  fs.readFileSync('filename')
} catch (err) {
  console.log(' message :', err.message)
  console.log(' name\t :', err.name)
  console.log(' code\t :', err.code)
  console.log(' path\t :', err.path)
  console.log(' errno\t :', err.errno)

  // { [Error: ENOENT, open 'filename']
  //   errno: 34,
  //   code: 'ENOENT',
  //   path: 'filename' }
}

console.log('\n[ Whoops Object Constructor ]\n')

const errObjt = new Whoops({
  message: 'The format of the JSON is invalid',
  name: 'JSONError',
  code: 'NotValidJSON',
  path: 'filename',
  errno: 127,
  foo: 'bar'
})

console.log(' message :', errObjt.message)
console.log(' name\t :', errObjt.name)
console.log(' code\t :', errObjt.code)
console.log(' path\t :', errObjt.path)
console.log(' errno\t :', errObjt.errno)
console.log(' foo\t :', errObjt.foo)

console.log('\n[ Whoops String constructor ]\n')

const errString = new Whoops('JSONError', 'NotValidJSON', 'The format of the JSON is invalid')

console.log(' message :', errString.message)
console.log(' name\t :', errString.name)
console.log(' code\t :', errString.code)

console.log('\n[ constructor comparation ]\n')

console.log('same message?\t', errString.message === errObjt.message)
console.log('same name?\t', errString.name === errObjt.name)
console.log('same typeof?\t', typeof errString === typeof errObjt)

console.log('\n[ handling err codes ]\n')

switch (errObjt.name) {
  case 'JSONError':
    console.log('your error logic here')
    break
  default:
    console.log('Standard Error name')
    break
}
