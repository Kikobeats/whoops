# Errorifier

![Last version](https://img.shields.io/github/tag/Kikobeats/errorifier.svg?style=flat-square)
[![Dependency status](http://img.shields.io/david/Kikobeats/errorifier.svg?style=flat-square)](https://david-dm.org/Kikobeats/errorifier)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/errorifier.svg?style=flat-square)](https://david-dm.org/Kikobeats/errorifier#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/errorifier.svg?style=flat-square)](https://www.npmjs.org/package/errorifier)
[![Gratipay](https://img.shields.io/gratipay/Kikobeats.svg?style=flat-square)](https://gratipay.com/~Kikobeats/)

> Adopting an uniform errors policy based in NodeJS errors schema.

## Why

- An easy way to create qualified errors.
- Using the standard Error interface in browser and NodeJS.
- Attach extra information, depending of your case of use.

The native `Error` global object in JavaScript is broken. It is different depending of your browser of your environment.

I feel that standard NodeJS are more powerful: this follow the same format. For example, if you try to read a file that doesn't exist you have the follow error:

```js
fs.readFile('filename', function(err, data) {
  console.log(err);
  // { [Error: ENOENT, open 'filename']
  //   errno: 34,
  //   code: 'ENOENT',
  //   path: 'filename' }
});

```

The `error` have a `code` that is useful because it's part of the output message. If you try to print the error:

```
console.log(err.message);
// => ENOENT, open 'filename'
```

This library pretend extend NodeJS standard error for whatever error that you need to create.

## Install

```bash
npm install errorifier --save
```

If you want to use in the browser (powered by [Browserify](http://browserify.org/)):

```bash
bower install errorifier --save
```

and later link in your HTML:

```html
<script src="bower_components/errorifier/dist/errorifier.js"></script>
```

## Usage

Load the constructor as a common NodeJS dependency:

```js
var Errorifier = require('errorifier');
```

Now, the next time that you need an error you have two ways to create.

If you don't need to specify to many things associated with the error, you can create it inline mode. Just provide the error type and the description as string:

```js
throw new Errorifier('NotValidJSON, The format of the JSON is invalid');
```

This will print the error and the stack trace:

```bash
Error: NotValidJSON, The format of the JSON is invalid
  at new Errorifier (/Users/josefranciscoverdugambin/Projects/errorifier/lib/Errorifier.coffee:6:17)
  at Object.<anonymous> (/Users/josefranciscoverdugambin/Projects/errorifier/example.js:3:7)
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
throw new Errorifier({
  code: 'NotValidJSON',
  message: 'The format of the JSON is invalid',
  errno: 127,
  foo: 'bar'
});
```

This prints the same as the inline mode, but you can store whatever thing (as `errno` or `foo` in this case) with the error.

## Always return an Error Object

If you code implementation is **synchronous**, return `Error` object under unexpected behaviors.

If you code implementation is **asynchronous**, return `Error` object under unexpected behaviors as well!

It's correct returns a object in a callback to express a unexpected behavior, but the object doesn't have a type and definetly doesn't follow a error interface:

```js
callback('LOL something was wrong'); // poor
callback({message: 'LOL something was wrong' } // poor, but better
callback(new Errorifier('LOL, something was wrong') // BEST!
```

Now you can associated different type of error with different behavior.

```js
switch (err.code) {
  case 'LOL':
    console.log('your error logic here');
    break;
  default:
    console.log('undefined code');
    break;
};
```

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
