'use strict';

var fs         = require('fs');
var Errorifier = require('./index.js');

console.log('\n[ Standard NodeJS errors ]\n');

var data;

try {
  data = fs.readFileSync('filename');
} catch (err) {
  console.log(err.message);

  // { [Error: ENOENT, open 'filename']
  //   errno: 34,
  //   code: 'ENOENT',
  //   path: 'filename' }
}

console.log('\n[ object constructor ]\n');

var errObjt = new Errorifier({
  message: 'The format of the JSON is invalid',
  code: 'NotValidJSON',
  errno: 127,
  foo: 'bar'
});

console.log('\n[ handling err codes ]\n');

switch (errObjt.code) {
  case 'NotValidJSON':
    console.log('your error logic here');
    break;
  default:
    console.log('undefined code');
    break;
}

// inline mode
console.log('\n[ string constructor ]\n');

var errString = new Errorifier('NotValidJSON, The format of the %s is invalid', 'JSON');

console.log(errString.message);

console.log('\n[ constructor comparation ]\n');

console.log('same message?', errString.message === errObjt.message);
console.log('same code?', errString.code === errObjt.code);
console.log('same typeof?', typeof errString === typeof errObjt);
