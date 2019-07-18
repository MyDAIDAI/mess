// 浅拷贝
let a = {
  name: 'dengpan',
  book: {
    title: 'You Dont Konw JS',
    price: 45
  }
}
// Object.assign() 只会拷贝源对象自身的并且可枚举的属性到目标对象
// Object.assign() 拷贝的是属性值，假如源对象的属性值是一个对象的引用，那么它也指向那个引用
Object.defineProperty(a, 'name', {
  enumerable: false
})
var b = Object.assign({}, a)
// console.log('b', b)
// b.name = 'bbbb'
// b.book.price = 55
// console.log('result', a, b)

// 扩展运算符 ...
// 扩展运算符与 Object.assign() 一直，都是浅拷贝
var c = {...a}
// c.book.price = 66
// console.log(c, a) // { book: { title: 'You Dont Konw JS', price: 66 } } { book: { title: 'You Dont Konw JS', price: 66 } }

// 数组的 slice 方法
var arr = [0, '1', [2, 3]]
var bArr = arr.slice(1)
bArr[1][0] = 3
console.log('bArr', bArr, arr) // [ '1', [ 3, 3 ] ] [ 0, '1', [ 3, 3 ] ]

// 深拷贝
// JSON.parse(JSON.stringify())
let dDeep = JSON.parse(JSON.stringify(a))
dDeep.book.price = 77
console.log(dDeep, a) // { book: { title: 'You Dont Konw JS', price: 77 } } { book: { title: 'You Dont Konw JS', price: 45 } }

// JSON.parse(JSON.stringify())会忽略 undefined, symbol, 不能序列化函数
let testObj = {
  name: 'testObj',
  a: undefined,
  b: Symbol('aaa'),
  c: function () {}
}
let testObjCopy = JSON.parse(JSON.stringify(testObj))
console.log(testObj, testObjCopy) // { name: 'testObj',a: undefined,b: Symbol(aaa),c: [Function: c] } { name: 'testObj' }

// JSON.parse(JSON.stringify())不能处理循环引用的对象，会报错
let circleObj = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
}
circleObj.a = circleObj.b
circleObj.b.c = circleObj.a
// console.log(JSON.parse(JSON.stringify(circleObj))) // TypeError: Converting circular structure to JSON

// 正则
let regxObj = {
  name: 'regxObj',
  a: /'123'/
}
console.log(regxObj) // { name: 'regxObj', a: /'123'/ }
console.log(JSON.parse(JSON.stringify(regxObj))) // { name: 'regxObj', a: {} }

