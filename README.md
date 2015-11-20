# Whoops

![Last version](https://img.shields.io/github/tag/Kikobeats/whoops.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/whoops/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/whoops)
[![Dependency status](http://img.shields.io/david/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/whoops.svg?style=flat-square)](https://www.npmjs.org/package/whoops)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> Simplification of Error Constructor.

## Why

- An easy way to create qualified errors.
- Using the standard Error interface in browser and NodeJS.
- Attach extra information, depending of your case of use.

Basically turns:

```js
var error = new Error('ENOFILE, Something is wrong');
error.name = 'DAMNError';
error.code = 'ENOFILE';

console.log(error.name) // => 'DAMNError: Something is wrong'
return error;
```

into more productive Error constructor:

```js
var Whoops = require('Whoops');
var error = new Whoops('DAMNError', 'ENOFILE', 'Something is wrong');

console.log(error.name) // => 'DAMNError: ENOFILE, Something is wrong'
return error;
```

Also support object constructor and possibility to define more fields:

```js
var error = new Whoops({
  name: 'DAMNError', , ''
  code: 'ENOFILE'
  message: Something is wrong
  path: 'filepath'
});

console.log(error.name) // => 'DAMNError: ENOFILE, Something is wrong'
console.log(error.path) // => 'filepath'
return error;
```

## Install

```bash
npm install whoops --save
```

If you want to use in the browser (powered by [Browserify](http://browserify.org/)):

```bash
bower install whoops --save
```

and later link in your HTML:

```html
<script src="bower_components/whoops/dist/whoops.js"></script>
```

## Usage

Load the constructor as a common NodeJS dependency:

```js
var Whoops = require('whoops');
```

Now, the next time that you need an error you have two ways to create.

If you don't need to specify to many things associated with the error, you can create it inline mode. Just provide the error type and the description as string:

```js
throw new Whoops('JSONError', 'The format of the JSON is invalid');

JSONError: The format of the JSON is invalid
  at new Whoops (/Users/josefranciscoverdugambin/Projects/whoops/lib/Whoops.coffee:6:17)
  at Object.<anonymous> (/Users/josefranciscoverdugambin/Projects/whoops/example.js:3:7)
  at Module._compile (module.js:456:26)
  at Object.Module._extensions..js (module.js:474:10)
  at Module.load (module.js:356:32)
  at Function.Module._load (module.js:312:12)
  at Function.Module.runMain (module.js:497:10)
  at startup (node.js:119:16)
  at node.js:935:3
```

Additionaly you can provide the error code that will be associated and printed in the message:

```js
throw new Whoops('JSONError', 'NotValidJSON', 'The format of the JSON is invalid');

JSONError: NotValidJSON, The format of the JSON is invalid
  at new Whoops (/Users/josefranciscoverdugambin/Projects/whoops/lib/Whoops.coffee:6:17)
  at Object.<anonymous> (/Users/josefranciscoverdugambin/Projects/whoops/example.js:3:7)
  at Module._compile (module.js:456:26)
  at Object.Module._extensions..js (module.js:474:10)
  at Module.load (module.js:356:32)
  at Function.Module._load (module.js:312:12)
  at Function.Module.runMain (module.js:497:10)
  at startup (node.js:119:16)
  at node.js:935:3
```

If you need to associate whatever thing with the error, you can use the Object param format:

```js
throw new Whoops({
  name: 'JSONError',
  code: 'NotValidJSON',
  message: 'The format of the JSON is invalid',
  errno: 127,
  foo: 'bar'
});
```

This prints the same as the inline mode, but you can store whatever thing (as `errno` or `foo` in this case) with the error.

## Always throw an Error object

If you code implementation is **synchronous**, return `Error` object under unexpected behaviors.

If you code implementation is **asynchronous**, return `Error` object under unexpected behaviors as well!

It's correct to return an object in a callback to express unexpected behavior, but the object doesn't have a type and definitely doesn't follow a error interface:

```js
callback('LOL something was wrong'); // poor
callback({message: 'LOL something was wrong' } // poor, but better
callback(new Whoops('LOL, something was wrong') // BEST!
```

Now you can associated different type of error with different behavior.

```js
switch (err.name) {
  case 'JSONError':
    console.log('your error logic here');
    break;
  default:
    console.log('undefined code');
    break;
};
```

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
