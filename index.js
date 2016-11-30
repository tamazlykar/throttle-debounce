'use strict';

;(function(exports) {
exports.throttle = function(func, wait) {
  let savedThis = null;
  let savedArgs = null;
  let timer = null;

  /**
   * Throttle function
   */
  function throttle() {
    /**
     * Invoke function and clear state
     */
    function run() {
      throttle.flush();
      savedThis = null;
      savedArgs = null;
      timer = null;
    }

    /**
     * Set timer to execute func
     */
    function setTimer() {
      timer = setTimeout(function() {
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
  }

  /**
   * Immediately invoke function
   */
  throttle.flush = function() {
    func.apply(savedThis, savedArgs);
  };

  /**
   * Cancel delayed func invocations
   */
  throttle.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return throttle;
};

exports.debounce = function(func, wait) {
  let savedThis = null;
  let savedArgs = null;
  let timer = null;

  /**
   * Debounce function
   */
  function debounce() {
    /**
     * Set new timeout for function
     */
    function setTimer() {
      timer = setTimeout(function() {
        debounce.flush();
        timer = null;
      }, wait);
    }

    savedThis = this;
    savedArgs = arguments;

    if (timer) {
      debounce.cancel();
      setTimer();
    } else {
      setTimer();
    }
  }

  /**
   * Immediately invoke function
   */
  debounce.flush = function() {
    func.apply(savedThis, savedArgs);
  };

  /**
   * Cancel delayed func invocations
   */
  debounce.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounce;
};
}(typeof exports === 'undifined' ? this['td']={} : exports));


