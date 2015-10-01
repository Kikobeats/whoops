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

// inline mode
// throw new Errorifier('NotValidJSON, The format of the JSON is invalid');

// object mode
var err = new Errorifier({
  message: 'The format of the JSON is invalid',
  code: 'NotValidJSON',
  errno: 127,
  foo: 'bar'
});

console.log('\n[ handling err codes ]\n');

switch (err.code) {
  case 'NotValidJSON':
    console.log('your error logic here');
    break;
  default:
    console.log('undefined code');
    break;
}
