// 实现promise, 链式调用, resove,reject, 穿透,catch,  reject为空. race,all实现. es6实现.
// 统计PromiseA+规范
// 其他实现的错误.
// 微任务实现, 以及nexttick\settimeout\setimmdeite的区别
// require('immdeite')的同步转异步的实现.
// 分别node环境和javascript环境的测试.
// promise异步限制并发图片的实现

//https://zhuanlan.zhihu.com/p/102017798
https://zhuanlan.zhihu.com/p/25178630
https://blog.csdn.net/Yun__shen/article/details/104525021
https://segmentfault.com/a/1190000020872602
https://imweb.io/topic/5bbc264b6477d81e668cc930

const PENDING = 'pending';
const FULEILLED = 'fulfilled';
const REJECT = 'reject';

function myPromise(execurtor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallback = [];
  this.onRejectCallback = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.value = value;
      this.state = FULEILLED;
      this.onFulfilledCallback.forEach(fn => {
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
    execurtor(resolve, reject)
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

  if (typeof onReject !== 'function') {
    onReject = function (value) {
      return value
    }
  }

  const promise2 = new myPromise((resolve, reject) => {
    switch (this.state) {
      case PENDING:
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.reason);
              resolve(x);
            } catch (error) {
              reject(x)
            }
          }, 0);
        })
        this.onRejectCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onReject(this.value);
              resolve(x);
            } catch (error) {
              reject(x)
            }
          }, 0);
        })
        break;
      case FULEILLED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolve(x)
          } catch (error) {
            reject(x)
          }
        }, 0);
        break;
      case REJECT:
        setTimeout(() => {
          try {
            const x = onReject(this.reason);
            resolve(x)
          } catch (error) {
            reject(x)
          }
        }, 0);
        break;
      default:
        break;
    }
  })

  return promise2;
}

myPromise.prototype.all = function (promises) {
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

myPromise.prototype.race = function (promises) {
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


let a = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 0);
})

a.then(res => {
  console.log(res)
})

a.then(res => {
  console.log(res + '  1')
})


