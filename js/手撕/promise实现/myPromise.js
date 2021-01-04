class MyPromise {
  constructor(excutor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.reason = null;

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    this.initBind();
    this.init(excutor);
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this)
  }

  init(excutor) {
    try {
      excutor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e)
    }
  }
  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(cb => cb(this.value))
      }, 0);
    }
  }
  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach(cb => cb(this.reason))
      }, 0);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let promise2;
    if (this.status === MyPromise.PENDING) {
      return promise2 = new MyPromise((resolve, reject) => {
        this.onFulfilledCallback.push((value) => {
          try {
            const x = onFulfilled(value);
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallback.push((reason) => {
          try {
            const x = onRejected(reason);
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === MyPromise.FULFILLED) {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
    }

    if (this.status === MyPromise.REJECTED) {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            MyPromise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
    }
  }

  static resolvePromise(promise2, x, resolve, reject) {
    let called = false;

    if (promise2 === x) {
      throw TypeError('circle reference')
    }

    if (x instanceof MyPromise) {
      if (x.status === MyPromise.PENDING) {
        x.then(y => {
          MyPromise.resolvePromise(promise2, y, resolve, reject)
        }, reason => {
          reject(reason)
        })
      }
      else {
        x.then(resolve, reject)
      }
    }
    else if (x !== null && typeof x === 'object' || typeof x === 'function') {
      try {
        let then = x.then;
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) return;
            called = true;
            MyPromise.resolvePromise(promise2, y, resolve, reject)
          }, reason => {
            if (called) return;
            called = true;
            reject(reason)
          })
        } else {
          resolve(x)
        }


      } catch (e) {
        if (called) return;
        called = true;
        reject(e)
      }
    }
    else {
      resolve(x)
    }
  }

  static finally(f) {
    return this.then(value => {
      return Promise.resolve(f()).then(() => value)
    }, reason => {
      return Promise.resolve(f()).then(() => reason)
      //return Promise.resolve(f()).then(() => {throw reason})
    })
  }

  static catch(onRejected) {
    return this.then(null, onRejected)
  }

  static race(arr) {
    return new Promise((r, j) => {
      Array.from(arr).forEach((value) => {
        Promise.resolve(value).then(r, j)
      })
    })
  }

  static all(arr) {
    return new Promise((r, j) => {
      if (arr.length === 0) {
        r([])
      } else {
        let count = 0;
        let res = new Array(arr.length);
        arr.forEach((promise, idx) => {
          promise.then((value) => {
            res[idx] = value;
            count++;
            if (count === arr.length) {
              r(res)
            }
          }).catch(err => {
            j(err)
          })
        })
      }
    })
  }

  static reject(value) {
    return new Promise((r, j) => {
      j(value)
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }

    return new MyPromise((r, j) => {
      r(value)
    })
  }
}

MyPromise.PENDING = 'PENDING';
MyPromise.FULFILLED = 'FULFILLED';
MyPromise.REJECTED = 'REJECTED';

MyPromise.deferred = function () {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })

  return defer;
}

try {
  module.exports = MyPromise
} catch (e) {
  console.log(e)
}
