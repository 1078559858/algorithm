// https://zhuanlan.zhihu.com/p/102018323 es6实现es6
// 这篇文章写的很好，但是没找到异步的地方，比如settimeout的地方

class Promise {
  constructor(fn) {
    this.callbacks = [];
    this.state = 'pending';
    this.value = null;

    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve || function (value) { return value }, // 添加了resolve
        reject: reject || function (value) { return value }
      })
    })
  }

  catch(onError) {
    return this.then(null, onError)
  }

  finally(onDone) {
    if (typeof onDone !== 'function') {
      return this.then()
    }

    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    )
  }

  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }

    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
    if (!cb) {
      cb = this.state === "fulfilled" ? callback.reason : callback.reject;
      cb(this.value);
      return;
    }

    let ret;
    try {
      ret = cb(this.value);
      cb = this.state === "fulfilled" ? callback.reason : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject;
    } finally {
      cb(ret)
    }
  }

  _resolve(value) {
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      let then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    this.state = 'fulfilled';
    this.value = value;
    this.callbacks.forEach(fn => this._handle(fn))
  }

  _reject(value) {
    this.state = 'rejected';
    this.value = value;
    this.callbacks.forEach(fn => this._handle(fn));

  }

  static resolve(value) {
    if (value && value instanceof Promise) {
      return value
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(resolve)
      })
    } else if (value) {
      return new Promise((r, j) => r(value))
    } else {
      return new Promise(r => r())
    }
  }

  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      return new Promise((r, j) => {
        then(j)
      })
    } else {
      return new Promise((r, j) => j(value))
    }
  }

  static all(promises) {
    let len = promises.length;
    let count = 0;
    let res = Array(len);
    return new Promise((r, j) => {
      if (len === 0) {
        return r([]);
      } else {
        Promise.resolve(promises).forEach((promise, idx) => {
          promise.then(data => {
            res[idx] = data;
            count++;
            if (count === len) {
              r(res)
            }
          }, reason => {
            j(reason);
          })
        })
      }
    })
  }

  static race(promises) {
    return new Promise((r, j) => {
      promises.forEach(promise => {
        Promise.resolve(promise).then(data => {
          r(data)
        }, error => {
          j(error)
        })
      })
    })
  }
}