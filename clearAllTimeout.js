const MY_TIMER = {
  timeoutIds: [],

  setTimeout: function (fn, delay) {
    let id = setTimeout(fn, delay);
    this.timeoutIds.push(id);
    return id;
  },

  clearAllTimeout: function () {
    while (this.timeoutIds.length) {
      clearTimeout(this.timeoutIds.pop());
    }
  },
};
