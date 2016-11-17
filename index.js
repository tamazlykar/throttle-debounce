'use strict';

;(function(exports) {
exports.throttle = function(func, wait) {
  let savedThis = null;
  let savedArgs = null;
  let timer = null;

  return function() {
    /**
     *
     */
    function cancel() {
      if (timer) {
        clearTimeout(timer);
      }
    }

    /**
     *
     */
    function flush() {
      func.apply(savedThis, savedArgs);
    }

    /**
     *
     */
    function run() {
      flush();
      savedThis = null;
      savedArgs = null;
    }

    /**
     *
     */
    function setTimer() {
      timer = setTimeout(function() {
        timer = null;
        if (savedArgs) {
          run();
          setTimer();
        }
      }, wait);
    }

    savedThis = this;
    savedArgs = arguments;

    if (!timer) {
      run(); // first run
      setTimer();
    }
  };
};

exports.debounce = function(func, wait) {

};
}(typeof exports === 'undifined' ? this['td']={} : exports));


