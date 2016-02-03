Whoops = require '..'
should = require 'should'
isType = require 'is-type'

describe 'Whoops ::', ->

  it 'basic', ->
    err = Whoops()
    isType.error(err).should.be.true()
    err.name.should.be.equal 'Error'
    (!!err.code).should.be.equal false
    (!!err.description).should.be.equal false
    (!!err.message).should.be.equal false

  describe 'instanceof', ->

    it 'generic', ->
      Whoops().should.be.instanceof(Error)

    it 'typed', ->
      DAMNError = Whoops.create('DAMNError')
      DAMNError.should.be.instanceof(Error)
      DAMNError().should.be.instanceof(Error)
      DAMNError().should.be.instanceof(DAMNError)

  describe 'factory', ->
    describe 'object', ->
      it 'providing message', ->
        err = Whoops
          message: 'damn'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'Error'
        err.message.should.be.equal 'damn'

      it 'providing name and message', ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal 'something is wrong'

      it 'providing name, message and code', ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'
          code: 'ENOCODE'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal 'ENOCODE, something is wrong'

      it 'providing name, message, code and custom fields',  ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'
          code: 'ENOCODE'
          path: process.cwd()

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal 'ENOCODE, something is wrong'
        err.path.should.be.equal process.cwd()

      it 'providing name, message function, code and custom fields', ->
        err = Whoops
          name: 'DAMN'
          path: process.cwd()
          file: 'damnfile'
          code: 'ENOCODE'
          message: -> "something is wrong with '#{this.file}'"

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal "ENOCODE, something is wrong with 'damnfile'"
        err.path.should.be.equal process.cwd()

    describe 'string', ->
      it 'providing message', ->
        err = Whoops 'damn'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'Error'
        err.message.should.be.equal 'damn'

      it "providing mesage and name", ->
        err = Whoops 'DAMN', 'something is wrong'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal 'something is wrong'

      it "providing mesage, name and code", ->
        err = Whoops 'DAMN', 'ENOCODE', 'something is wrong'

        isType.error(err).should.be.true()
        err.name.should.be.equal 'DAMN'
        err.code.should.be.equal 'ENOCODE'
        err.message.should.be.equal 'ENOCODE, something is wrong'

    describe  'class', ->
      it 'create a custom class', ->
        MyError = Whoops.create 'MyError'
        err = MyError()

        isType.error(err).should.be.true()
        err.should.be.an.instanceof(Error)

      it "avoid param 'name' from string factory", ->
        MyError = Whoops.create 'MyError'
        err = MyError('ENOCODE', 'something is wrong')

        isType.error(err).should.be.true()
        err.name.should.be.equal 'MyError'
        err.code.should.be.equal 'ENOCODE'
        err.message.should.be.equal 'ENOCODE, something is wrong'
