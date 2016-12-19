Whoops = require '..'
should = require 'should'

describe 'Whoops ::', ->

  it 'basic', ->
    err = Whoops()
    err.should.be.an.Error()
    err.name.should.be.equal 'Error'
    (!!err.code).should.be.false()
    (!!err.description).should.be.false()
    (!!err.message).should.be.false()

  describe 'instanceof', ->

    it 'generic', ->
      Whoops().should.be.instanceof(Error)

    it 'typed', ->
      DAMNError = Whoops.create('DAMNError')
      DAMNError().should.be.instanceof(Error)
      DAMNError().should.be.instanceof(DAMNError)

  describe 'factory', ->
    describe 'object', ->
      it 'providing message', ->
        err = Whoops
          message: 'damn'

        err.should.be.an.Error()
        err.name.should.be.equal 'Error'
        err.message.should.be.equal 'damn'
        err.description.should.be.equal 'damn'

      it 'providing name and message', ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'

        err.should.be.an.Error()
        err.name.should.be.equal 'DAMN'
        err.message.should.be.equal 'something is wrong'
        err.description.should.be.equal 'something is wrong'

      it 'providing name, message and code', ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'
          code: 'ENOCODE'

        err.should.be.an.Error()
        err.name.should.be.equal 'DAMN'
        err.code.should.be.equal 'ENOCODE'
        err.description.should.be.equal 'something is wrong'
        err.message.should.be.equal 'ENOCODE, something is wrong'

      it 'providing name, message, code and custom fields',  ->
        err = Whoops
          name: 'DAMN'
          message: 'something is wrong'
          code: 'ENOCODE'
          path: process.cwd()

        err.should.be.an.Error()
        err.name.should.be.equal 'DAMN'
        err.code.should.be.equal 'ENOCODE'
        err.description.should.be.equal 'something is wrong'
        err.message.should.be.equal 'ENOCODE, something is wrong'
        err.path.should.be.equal process.cwd()

      it 'providing name, message function, code and custom fields', ->
        err = Whoops
          name: 'DAMN'
          path: process.cwd()
          file: 'damnfile'
          code: 'ENOCODE'
          message: -> "something is wrong with '#{this.file}'"

        err.should.be.an.Error()
        err.name.should.be.equal 'DAMN'
        err.code.should.be.equal 'ENOCODE'
        err.description.should.be.equal "something is wrong with 'damnfile'"
        err.message.should.be.equal "ENOCODE, something is wrong with 'damnfile'"
        err.path.should.be.equal process.cwd()

    describe 'string', ->
      it 'one arguments → message', ->
        err = Whoops 'damn'

        err.should.be.an.Error()
        err.name.should.be.equal 'Error'
        err.message.should.be.equal 'damn'
        err.description.should.be.equal 'damn'

      it "two arguments → code and message", ->
        err = Whoops 'DAMN', 'something is wrong'

        err.should.be.an.Error()
        err.code.should.be.equal 'DAMN'
        err.description.should.be.equal 'something is wrong'
        err.message.should.be.equal 'DAMN, something is wrong'

    describe  'class', ->
      it 'create a custom class', ->
        MyError = Whoops.create 'MyError'
        err = MyError()

        err.should.be.an.Error()
        err.should.be.an.instanceof(Error)

      it "avoid param 'name' from string factory", ->
        MyError = Whoops.create 'MyError'
        err = MyError('ENOCODE', 'something is wrong')

        err.should.be.an.Error()
        err.name.should.be.equal 'MyError'
        err.code.should.be.equal 'ENOCODE'
        err.description.should.be.equal 'something is wrong'
        err.message.should.be.equal 'ENOCODE, something is wrong'
