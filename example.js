'use strict';

var fs         = require('fs');
var Errorifier = require('./index.js');

// Standard NodeJS errors

fs.readFile('filename', function(err, data) {
  console.log(err.message);
  // { [Error: ENOENT, open 'filename']
  //   errno: 34,
  //   code: 'ENOENT',
  //   path: 'filename' }
});

// inline mode
// throw new Errorifier('NotValidJSON, The format of the JSON is invalid');

// object mode
var err = new Errorifier({
  message: 'The format of the JSON is invalid',
  code: 'NotValidJSON',
  errno: 127,
  foo: 'bar'
});

console.log('handling err codes');

switch (err.code) {
  case 'NotValidJSON':
    console.log('your error logic here');
    break;
  default:
    console.log('undefined code');
    break;
}
