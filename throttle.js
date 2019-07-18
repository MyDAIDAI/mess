function throttle (fn, wait) {
  let previous = 0
  return function (...args) {
    let now = +new Date()
    if (now - previous >= wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}
let betterFn = throttle(() => {
  console.log('fn 被执行了')
}, 200)
setTimeout(betterFn, 100)
