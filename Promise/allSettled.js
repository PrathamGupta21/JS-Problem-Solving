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
