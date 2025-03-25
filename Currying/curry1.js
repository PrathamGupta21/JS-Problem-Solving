// Implement a currying function for 4 arguments. When we have reached the limit, return the value.

// sum(1, 2, 3, 4)
// sum(1)(2)(3)(4)
// sum(1, 2)(3, 4)
// sum(1, 2, 3)(4)
// sum(1)(2, 3, 4)

//all should return 10

const sum = (...args) => {
  const storage = [...args];

  if (storage.length === 4) {
    return storage.reduce((a, b) => a + b, 0);
  } else {
    const temp = function (...args2) {
      storage.push(...args2);
      if (storage.length === 4) {
        return storage.reduce((a, b) => a + b, 0);
      } else {
        return temp;
      }
    };
    return temp;
  }
};
