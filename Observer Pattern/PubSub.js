const PubSub = function () {
  this.handlers = [];

  this.subscribe = function (fn) {
    this.handlers.push(fn);
  };

  this.unsubscribe = function (fn) {
    this.handlers = this.handlers.filter((item) => item !== fn);
  };

  this.fire = function (arg, thisObj) {
    const scope = thisObj || window;

    this.handlers.forEach((item) => {
      item.call(scope, arg);
    });
  };
};
