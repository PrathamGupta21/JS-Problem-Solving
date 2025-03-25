// Given an nested object which can have any type of object, deep flatten it and return the new object in Javascript.

// Example

// Input:
// {
//   A: '12',
//   B: 23,
//   C: {
//     P: 23,
//     O: {
//       L: 56,
//     },
//     Q: [1, 2],
//   },
// };

// Output:
// {
//   A: '12',
//   B: 23,
//   'C.O.L': 56,
//   'C.P': 23,
//   'C.Q.0': 1,
//   'C.Q.1': 2,
// };

const flatten = (obj, prefix) => {
  let output = {};

  for (let k in obj) {
    let val = obj[k];

    const newKey = prefix ? prefix + '.' + k : k;

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        //use rest & spread together to convert array to object
        const { ...arrToObj } = val;
        const newObj = flatten(arrToObj, newKey);
        output = { ...output, ...newObj };
      } else {
        const newObj = flatten(val, newKey);
        output = { ...output, ...newObj };
      }
    } else {
      output = { ...output, [newKey]: val };
    }
  }
  return output;
};
