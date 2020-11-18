8. new的实现
function myNew() {
  var constructor = [].shift.call(arguments)
  var obj = object.create({})
  obj.__proto__ = constructor.prototype;
  constructor.call(obj, arguments)
  return obj
}

function myNew() {
  var constructor = [].shift.call(arguments)
  var obj = Object.create({})
  obj.__proto__ = constructor.prototype;
  constructor.call(obj, arguments)
  return obj
}