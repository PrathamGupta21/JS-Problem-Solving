// Promise.all Polyfill
const myPromiseAll = function (promisesArray) {
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise, index) => {
      promise
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
  let counter = 0;

  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          promiseErrors[counter] = error;
          counter = counter + 1;
          if (counter === promisesArray.length) {
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
