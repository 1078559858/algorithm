function curring(fn) {
  return function curried(...args) {
    if (fn.length === args.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

let sum = function (a, b, c, d) {
  return a + b + c + d;
}

let f = curring(sum);
console.log(f(1)(2)(3)(4))


// toString的实现
// 原生JS实现add(1)(2)(3)(4)的调用方式
// 也可以使用柯里化实现。

// 方法1
var add = function (m) {

  var temp = function (n) {
    return add(m + n);
  }

  temp.toString = function () {
    return m;
  }

  return temp;
};

// 方法2
function add(x) {
  var sum = x;
  var tmp = function (y) {
    sum = sum + y;
    return tmp;
  };
  tmp.toString = function () {
    return sum;
  };
  return tmp;
}

console.log(add(3)(4)(5)); // 12
conssole.log(add(3)(6)(9)(25)); // 43