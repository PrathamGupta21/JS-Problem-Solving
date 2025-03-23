// Promise.all Polyfill
const myPromiseAll = function (promisesArray) {
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((val) => {
          results[index] = val;
          promisesCompleted += 1;

          if (promisesCompleted === promisesArray.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// Promise.any Polyfill
const myPromiseAny = function (promisesArray) {
  const promiseErrors = new Array(promisesArray.length);
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          promiseErrors[promisesCompleted] = error;
          promisesCompleted = promisesCompleted + 1;
          if (promisesCompleted === promisesArray.length) {
            reject(new AggregateError(promiseErrors, 'All promises rejected'));
          }
        });
    });
  });
};

// Promise.race Polyfill
const myPromiseRace = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject).catch(reject);
    });
  });
};

// Promise.allSettled Polyfill
const myPromiseAllSettled = function (promisesArray) {
  return new Promise((resolve) => {
    const results = [];
    let promisesCompleted = 0;

    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((val) => {
          results[index] = { status: 'fulfilled', val };
        })
        .catch((error) => {
          results[index] = { status: 'rejected', error };
        })
        .finally(() => {
          promisesCompleted += 1;
          if (promisesCompleted === promisesArray.length) {
            resolve(results);
          }
        });
    });
  });
};

// Custom Promise Implementation
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        queueMicrotask(() => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        queueMicrotask(() => {
          try {
            const result = onRejected ? onRejected(this.reason) : this.reason;
            reject(result);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const result = onFulfilled ? onFulfilled(this.value) : this.value;
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const result = onRejected ? onRejected(this.reason) : this.reason;
              reject(result);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }
}
