window.timeoutIds = [];

const originalTimeoutFn = window.setTimeout;

window.setTimeout = function (fn, delay) {
  const id = originalTimeoutFn(fn, delay);
  timeoutIds.push(id);
  return id;
};

window.clearAllTimeout = function () {
  while (timeoutIds.length) {
    clearTimeout(timeoutIds.pop());
  }
};
