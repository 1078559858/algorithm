// 实现promise, 链式调用, resove,reject, 穿透,catch,  reject为空. race,all实现. es6实现.
// 统计PromiseA+规范
// 其他实现的错误.
// 微任务实现, 以及nexttick\settimeout\setimmdeite的区别
// require('immdeite')的同步转异步的实现.
// 分别node环境和javascript环境的测试.
// promise异步限制并发图片的实现

// 技巧   第一个实现的非常好
// 1.  then函数中，return this实现值穿透。 // https://blog.csdn.net/Yun__shen/article/details/104525021
// 2. 无限循环判断，以及then异步。// https://zhuanlan.zhihu.com/p/25178630
// 3. es6实现（总觉得有问题，没有settimeout）//https://zhuanlan.zhihu.com/p/102017798
// 4. 和2一样的实现 // https://segmentfault.com/a/1190000020872602
// 5. // https://imweb.io/topic/5bbc264b6477d81e668cc930
// 6. // https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0promise.md


// 值穿透， 当前的逻辑已经实现了，不用return this。 
// Promise.prototype.then = function (onFulfilled, onRejected) {
//   if (!isFunction(onFulfilled) && this.state === FULFILLED ||
//     !isFunction(onRejected) && this.state === REJECTED) {
//     return this;
//   }
//   ...
// };

const PENDING = 'pending';
const FULEILLED = 'fulfilled';
const REJECT = 'reject';

function myPromise(execurtor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallback = [];
  this.onRejectCallback = [];

  let _this = this;
  // 处理异步
  this.resolve = function (value) {
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        value.then(_this.resolve);
        return;
      }
    }

    if (_this.state === PENDING) {
      _this.value = value;
      _this.state = FULEILLED;
      _this.onFulfilledCallback.forEach(fn => {
        fn()
      })
    }
  }

  const reject = (value) => {
    if (this.state === PENDING) {
      this.reason = value;
      this.state = REJECT;
      this.onRejectCallback.forEach(fn => {
        fn();
      })
    }
  }

  try {
    execurtor(this.resolve, reject)
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (onFulfilled, onReject) {
  if (typeof onFulfilled !== 'function') {
    onFulfilled = function (value) {
      return value
    }
  }

  // reject实现
  if (typeof onReject !== 'function') {
    onReject = function (value) {
      throw value
      // return value;
    }
  }

  const promise2 = new myPromise((resolve, reject) => {
    switch (this.state) {
      case PENDING:
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        this.onRejectCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onReject(this.reason);
              resolve(x);
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        break;
      case FULEILLED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case REJECT:
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
        break;
      default:
        break;
    }
  })

  return promise2;
}

myPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([])
    } else {
      let result = [];
      let count = 0;
      promises.forEach((promise, idx) => {
        promise.then(data => {
          result[idx] = data;
          if (++count === promises.length) {
            resolve(reject)
          }
        }, err => {
          reject(err);
          return;
        })
      })
    }
  })
}

myPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
    } else {
      for (var i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          resolve(data)
        }, err => {
          reject(err)
        })
      }
    }
  })
}

myPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

myPromise.prototype.finally = function (onDone) {
  //return this.then(onDone, onDone); // 简洁模式，但是有状态，ondone有参数。

  if (typeof onDone !== 'function') {
    return this.then()
  }

  return this.then(value => Promise.resolve(() => onDone()).then(() => value)
    , reason => Promise.reject(onDone()).then(() => { throw reason }))
}

myPromise.resolve = function (value) {
  if (value && value instanceof Promise) {
    return value;
  } else if (value && typeof value === 'object' && typeof value.then === 'function') {
    let then = value.then;
    return new Promise(resolve => {
      then(resolve);
    });

  } else if (value) {
    return new Promise(resolve => resolve(value));
  } else {
    return new Promise(resolve => resolve());
  }
}

myPromise.reject = function (value) {
  if (value && typeof value === 'object' && typeof value.then === 'function') {
    let then = value.then;
    return new Promise((resolve, reject) => {
      then(reject);
    });
  } else {
    return new Promise((resolve, reject) => reject(value));
  }
}

exports.myPromise = myPromise;