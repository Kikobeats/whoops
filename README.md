# whoops

<p align="center">
  <img src="https://i.imgur.com/93fMUWX.png" alt="whoops">
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/whoops.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/whoops/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/whoops)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/whoops.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/whoops)
[![Dependency status](http://img.shields.io/david/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/whoops.svg?style=flat-square)](https://david-dm.org/Kikobeats/whoops#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/whoops.svg?style=flat-square)](https://www.npmjs.org/package/whoops)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> It makes simple throw qualified errors. Inspired in [errno](https://github.com/rvagg/node-errno) and [create-error-class](https://github.com/floatdrop/create-error-class).

## Why

- An easy way to create qualified errors.
- Using the standard `Error` interface in browser and NodeJS.
- Attach extra information, depending of your case of use.

This library is a compromise to provide a clean API for use `Error` native class.

## Install

```bash
npm install whoops --save
```

Basically it turns:

```js
var error = Error('Something is wrong')
error.name = 'DAMNError'
throw error
// => 'DAMNError: ENOFILE, Something is wrong'
```

Into a one line more productive declaration:

```js
var whoops = require('whoops');
var error = whoops('DAMError', 'Something is wrong');
throw error
// => 'DAMNError: Something is wrong'
```

## Creating an Error

This interface follow the one line principle. All the things that you can declare in this mode are:

#### message

Always that you want to create an `Error` need to provide a message for description.

```js
var userError = whoops('username already taken');
throw userError
// => 'Error: username already taken'
```

In the `Error` object you have:

```js
{
  name: 'Error',
  message: 'username already taken'
}
```

#### code

When you need to handle different errors, you need to distinguish the `Error`. For this purpose, you need yo associated a identifier that recognize each `Error`.

```js
var userError = whoops('ENAME', 'username already taken');
throw userError
// => 'Error: ENAME, username already taken'
```

In the error object you have:

```js
{
  name: 'Error',
  code: 'ENAME'
  message: 'username already taken'
}
```

## Creating qualified Errors

If you need to create a set of qualified errors associate with an `Error` name, you can create a specific error factory for this purpose.

```js
var USRError = whoops.create('USRError')
throw USRError('ENAME', 'username already taken')
// => 'USRError: ENAME, username already taken'
```

Notes how now `USRError` is an instance of `Error`.

## Attaching more information

Because `Error` is an `object`, you can attach more information.

For do that, you can feel more comfortable using the object interface:

```js
var error = USRError({
  code: 'ENAME',
  username: '@kikobeats',
  message: function() {
    return "username '" + this.username "' already taken"
  }
});

throw error
// => 'USRError: ENAME, username '@kikobeats' already taken'
```

Each property that you provide in this mode, will be attached to the final `Error`.

Also as you can see you can setup the message of the error dynamically.

This mode could be used without using qualified errors as well:

```js
var error = whoops({
  name: 'USRError',
  code: 'ENAME',
  username: '@kikobeats',
  message: function() {
    return "username '" + this.username "' already taken"
  }
});
```

## API

### .constructor([String|Object])

Create a new `Error`. You can use it using two different interfaces.

#### String Constructor

Following the schema `.constructor([code], {message})`

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
callback(whoops('LOL, something was wrong') // BEST!
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

## Related

* [fault](https://github.com/wooorm/fault) – Functional errors with formatted output.

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
