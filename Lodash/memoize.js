const memoize = function (fn) {
  const cache = {};

  return function () {
    const KEY = JSON.stringify(arguments);

    if (cache[KEY]) {
      return cache[KEY];
    }

    const evaluatedValue = fn(...arguments);
    cache[KEY] = evaluatedValue;
    return evaluatedValue;
  };
};
