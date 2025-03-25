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
