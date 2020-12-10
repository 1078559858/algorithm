function myPromise(executer) {
  let self = this
  self.status = 'pending'
  self.value = undefined;
  self.reason = undefined;
  self.resolveCallBack = [];
  self.rejectCallBack = [];
  function resolve(value) {
    self.status = 'fulfilled'
    self.value = value;
    self.resolveCallBack.forEach(fn => fn())
  }
  function reject(reason) {
    self.status = 'rejected'
    self.reason = reason;
    self.rejectCallBack.forEach(fn => fn())
  }
  try {
    executer(resolve, reject);
  } catch (error) {
    reject(error)
  }

}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用了'))
  }
  let called;//表示当前有没有被调用过
  if ((x != null && typeof x == 'object') || typeof x == 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') { //已经非常确定x是一个Promise了
        x.then((y) => {// y有可能还是一个promise

          if (called) return;
          called = true;

          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else {//普通对象
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error)
    }
  } else {
    resolve(x);
  }
}

myPromise.prototype.then = function (onResolve, onReject) {
  onResolve = typeof onResolve === 'function' ? onResolve : data => data;
  onReject = typeof onReject === 'function' ? onReject : err => { throw err }
  let self = this;
  let promise2 = new myPromise((resolve, reject) => {
    if (self.status == 'fulfilled') {
      setTimeout(function () {
        try {
          let x = onResolve(self.value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)
    } else if (self.status == 'rejected') {
      setTimeout(function () {
        try {
          let x = onReject(self.reason);
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)

    } else if (self.status == 'pending') {
      self.resolveCallBack.push(function () {
        setTimeout(function () {
          try {
            let x = onResolve(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
      self.rejectCallBack.push(function () {
        setTimeout(function () {
          try {
            let x = onReject(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
    }
  })
  return promise2;

}

myPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

//实现一个promise的延迟对象
myPromise.defer = myPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new myPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
module.exports = myPromise;
