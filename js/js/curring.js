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