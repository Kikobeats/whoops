# Whoops

![Last version](https://img.shields.io/github/tag/Kikobeats/whoops.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/whoops/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/whoops)
[![Dependency status](http://img.shields.io/david/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/whoops.svg?style=flat-square)](https://www.npmjs.org/package/whoops)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> It makes simple throw qualified errors. Inspired in [errno](https://github.com/rvagg/node-errno) and [create-error-class](https://github.com/floatdrop/create-error-class).

## Why

- An easy way to create qualified errors.
- Using the standard Error interface in browser and NodeJS.
- Attach extra information, depending of your case of use.

Basically turns:

```js
var error = Error('ENOFILE, Something is wrong')
error.name = 'DAMNError'
error.code = 'ENOFILE'

throw error // => 'DAMNError: ENOFILE, Something is wrong'
```

into one line error declaration:

```js
var Whoops = require('Whoops');
var error = Whoops('DAMError', 'ENOFILE', 'Something is wrong');

throw error // => 'DAMNError: ENOFILE, Something is wrong'
```

Also you can create custom class errors for avoid write the name of the error
all the time:

```js
var DAMError = Whoops.create('DAMError')
```

Now you can avoid the first parameter in the inline declaration:

```js
var error = DAMError('ENOFILE', 'Something is wrong');
throw error // => 'DAMNError: ENOFILE, Something is wrong'
```

Constructor also can be executed in object mode for the cases where you need to
setup more properties associated with the error:

```js
var error = Whoops({
  name: 'DAMError', , ''
  code: 'ENOFILE'
  message: 'Something is wrong'
  path: 'filepath'
});

In this mode you can pass a generator function as message:

var error = Whoops({
  name: 'DAMError', , ''
  code: 'ENOFILE',
  file: 'damnfile'
  message: ->
    "Something is wrong with the file '" + this.file "'."
});

throw error // => "DAMNError: ENOFILE, Something is wrong with the file 'damnfile'"
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

## API

### .constructor([String|Object])

Create a new `Error`. You can use it using two different interfaces.

#### String Constructor

Following the schema `.constructor([name], [code], {message})`

#### Object Constructor

Whatever property that you pass in an object will be associated with the `Error`.

If you pass a function as `message` property will be executed in the context
of the `Error`.

For both constructor modes, if the `code` of the error is provided will be
concatenated and the begin of the `message`.

### .create({String})

Create a new qualified `Error`. All is the same than the normal constructor,
but in this case you don't have to provide the `name` of the error.

## Extra: Always throw/return an Error!

If you code implementation is

- **synchronous**, throws `Error`. If you just return the `Error` nothings happens!.
- **asynchronous**, returns `Error` in the first argument of the callback (or using promises).

About asynchronous code, is correct return a `Object` that is not a `Error` in the first argument of the callback to express unexpected behavior, but the `Object` doesn't have a type and definitely can't  follow a error interface for determinate a special behavior:

```js
callback('LOL something was wrong') // poor
callback({message: 'LOL something was wrong' } // poor, but better
callback(Whoops('LOL, something was wrong') // BEST!
```

Passing always an `Error` you can can associated different type of error with different behavior:

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
