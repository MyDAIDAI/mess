Function.prototype.bind2 = function (context) {
  let self = this
  let args = [...arguments].slice(1)
  var fnBound = function () {
    return self.apply(this instanceof fnBound ? this : context, [...args, ...arguments])
  }
  // var fnNoop = function () {}
  // fnNoop.prototype = this.prototype
  // fnBound.prototype = new fnNoop()
  fnBound.prototype = Object.create(this.prototype)
  return fnBound
}
function bar (age, height) {
  this.habit = 'bar habit'
  console.log('bar name', this.name)
  console.log('age', age)
  console.log('height', height)
}
bar.prototype.friend = 'bar friend'
var value = 1
var foo = {
  name: 'foo',
  value: 'foo'
}
// bar.bind2(foo, 11)(123)
var bindBar = bar.bind2(foo, 11)
var obj = new bindBar('adfadf')
console.log('obj', obj.habit)
console.log('friend', obj.friend)
// 直接修改了继承的原型对象
obj.__proto__.friend = 'obj friend'
console.log(bar.prototype.friend)
// 仍然绑定的为传入的 foo, 而非 new 操作实例的 this
// bar name foo
// age 11
// height adfadf
