// Implement a ClearAllTimeout function that will stop all the running setTimeout at once.

// Example

// Input:
// setTimeout(() => {console.log("hello")}, 2000);
// setTimeout(() => {console.log("hello1")}, 3000);
// setTimeout(() => {console.log("hello2")}, 4000);
// setTimeout(() => {console.log("hello3")}, 5000);
// clearAllTimeout();
// setTimeout(() => {console.log("hello4")}, 5000);

// Output:
// "hello4

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
