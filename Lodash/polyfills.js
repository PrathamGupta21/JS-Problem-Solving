const debounce = (func, delay) => {
  let timerId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(context, args), delay);
  };
};

const throttle = (func, limit) => {
  let timerId;
  let lastRan;

  return function () {
    const context = this;
    const args = arguments;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

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
