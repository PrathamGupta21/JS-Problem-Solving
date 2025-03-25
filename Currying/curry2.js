// Create a javascript function that will remember its previously passed values and return the sum of the current and previous value.

// Example
// sum(5); // 5
// sum(3); // 8
// sum(4); // 12
// sum(0); // 12

const curry = () => {
  let sum = 0;
  return function (num = 0) {
    sum += num;
    return sum;
  };
};
