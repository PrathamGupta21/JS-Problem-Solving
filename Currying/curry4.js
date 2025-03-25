let curry = (fn) => {
  let helper = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      let temp = (...args2) => {
        return helper(...args, ...args2);
      };
      return temp;
    }
  };

  return helper;
};
