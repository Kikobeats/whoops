'use strict'

function setPrototypeOf (obj, proto) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(obj, proto)
    return
  }
  obj.__proto__ = proto
}

module.exports = setPrototypeOf
