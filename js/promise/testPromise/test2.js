let myPromise = require('../实现promise.js').myPromise;
// let myPromise = require('./test');

// test race;
let fn = function (value, time) {
  return new myPromise(function tt(resolve, reject) {
    setTimeout(() => {
      resolve('value  ' + value)
    }, time);
  })
}

let fnError = function (value, time) {
  return new myPromise(function tt(resolve, reject) {
    setTimeout(() => {
      reject('value  ' + value)
    }, time);
  })
}

let p1 = fnError('promise1', 100);
let p2 = fn('promise2', 200);
let p3 = fn('promise3', 300);

let i = p1.then(res => {
  console.log('p1 then is:', res)
  return p2
}, err => {
  console.log('p1 err then is:', err)
  return p2;
}).then(res => {
  console.log('p2 then is:', res)
  return p3
}).then(res => {
  console.log('p3 then is:', res)
})
  .catch(err => {
    console.log('err is:', err)
  })

setTimeout(() => {
  console.log(i.catch)
}, 1000);

