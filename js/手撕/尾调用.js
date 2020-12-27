// 原理：上下文栈，模拟栈

// 尾递归： 最后一步一定是调用另一个函数，除函数和参数外不能有其他值。
// 如果尾调用自身，成为尾递归。
// 只有safari优化尾调用， chrome和firefox都不支持。
// 严格模式开始尾调用。
// 蹦床函数,和

// jump(sum(100, 200))
function jump(f) {
  while (f && f instanceof Function) {
    f = f();
  }

  return f;
}
// var sum = tco(function(){}); sum(1,1000)
function tco(f) {
  let value;
  let arr = [];
  let active = false;

  return function fn() {
    arr.push(arguments);
    if (!active) {
      active = true;
      while (arr.length) {
        value = f.apply(this, arr.shift())
      }
      active = false;
      return value;
    }
  }
}
