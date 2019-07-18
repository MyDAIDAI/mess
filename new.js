function create () {
  var obj = new Object()
  var Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, [...arguments])
  return result instanceof Object ? result : obj
}
function Car (color) {
  this.color = color
}
Car.prototype.start = function () {
  console.log(this.color + 'color start')
}
var car = create(Car, 'red')
console.log(car.color)
console.log(car.start())
car.__proto__.start = function () {
  console.log('start reload')
}
console.log(Car.prototype.start())
