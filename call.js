Function.prototype.call2 = function (context) {
  context = context ? Object(context) : window
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}
function bar (age) {
  console.log('age', age)
  console.log('name', this.name)
  return this.name + age
}
var foo = {
  name: 'foo'
}
console.log(bar.call2(foo, 11))

Function.prototype.apply2 = function (context, arr) {
  context = context ? Object(context) : window
  context.fn = this
  let result
  if (!arr) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }
  return result
}
