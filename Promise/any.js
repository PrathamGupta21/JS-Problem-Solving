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
