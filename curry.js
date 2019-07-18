function curry (fn, length) {
  length = length || fn.length
  return function (...args) {
    return args.length >= length ? fn.apply(this, args) : curry(fn.bind(this), length - args.length)
  }
}
