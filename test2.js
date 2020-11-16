var a = require('./test.js')

var obj = { a: 2 }

module.exports.fn = function () {
  console.log('2 fn')
  return obj.a + a.fn()
}