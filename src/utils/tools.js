export function debounce1(fn, interval = 300) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}
export function throttle1(fn, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

export function debounce2(){
  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var context = this
      var args = arguments
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
  }
  var fn = function () {
    console.log('boom')
  }

  // setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次

  setInterval(debounce(fn,2000),1000) // 不会触发一次
}
export function throttle2() {
  function throttle(fn, gapTime) {
    let _lastTime = null;

    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn();
        _lastTime = _nowTime
      }
    }
  }

  let fn = ()=>{
    console.log('boom')
  }
  setInterval(throttle(fn,1000),10)
}
