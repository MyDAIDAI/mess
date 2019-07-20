// 数组
// 1. 使用 delete 删除数组中的值，其 length 不会发生变化
let arr1 = ['a', 'b', 'c']
//delete before [ 'a', 'b', 'c' ] 3
console.log('delete before', arr1, arr1.length)
delete arr1[0]
// delete after [ <1 empty item>, 'b', 'c' ] 3
console.log('delete after', arr1, arr1.length)

// TODO 2. 稀疏数组，未设置的 undefined 与显式设置 undefined 区别
let arr2 = []
arr2[3] = 5
arr2[4] = undefined
// arr2 [ <3 empty items>, 5, undefined ] true 5
// 上面的结果 为相等 ?
console.log('arr2', arr2, arr2[0] === arr2[4], arr2.length)

// 3. 对数组赋值字符串属性
let arr3 = ['a', 'b', 'c']
arr3['test'] = 'test'
// arr3 test 3
console.log('arr3', arr3.test, arr3.length)
// 添加可以强制转换为数字的字符串
arr3['12'] = '12'
// arr3 [ 'a', 'b', 'c', <9 empty items>, '12', test: 'test' ] 13
console.log('arr3', arr3, arr3.length)


// 类数组
// 1. 类数组转换为数组
function foo () {
  console.log('foo slice', Array.prototype.slice.call(arguments))
  console.log('foo Array.from', Array.from(arguments))

  // 👇两个方法不能将类数组转为数组
  // foo concat [ { '0': 'a', '1': 's', '2': 'd' } ]
  console.log('foo concat', Array.prototype.concat.call([], arguments))
  // foo indexOf -1
  console.log('foo indexOf', Array.prototype.indexOf.call([], arguments))
}
foo('a', 's', 'd')

// 字符串
// 1. 与字符串数组关系
// 相似点
let str1 = 'foo'
let arr4 = ['f', 'o', 'o']
console.log(str1[0], arr4[0])
console.log(str1.indexOf('o'), arr4.indexOf('o'))
// concat 方法返回的是副本
let str2 = str1.concat('a')
let arr5 = arr4.concat(['a'])
console.log(str2, arr5)
console.log(str1 === str2, arr4 === arr5)
console.log(str1, arr4)
// 区别点
str1[0] = 'a'
arr4[0] = 'a'
// foo [ 'a', 'o', 'o' ]
// 字符串为基本类型值，其值本身不可变，其方法返回的都为副本
// 数组是引用类型的值，可以修改其本身的值
console.log(str1, arr4)
// 2. 数组与字符串互相转换
// arr change data [ 'f', 'o', 'o' ] aoo
console.log('arr change data', str1.split(''), arr4.join(''))

//  数字
// 整数是没有小数的十进制数，小数点后面的0会被省略
let num1 = 42.0
let num2 = 42
console.log(num1, num2) // 42 42
// 大数字与小数字显示
let num3 = 5E10
console.log(num3, num3.toExponential()) // 50000000000 '5e+10'
let num4 = num3 * num3
let num5 = 1 / num4
console.log(num4, num5) // 2.5e+21  4e-22
// 指定小数部分显示位数
let num6 = 42.09
num6.toFixed(0) // "42"
num6.toFixed(1) // "42.1"
num6.toFixed(2) // "42.09"
num6.toFixed(3) // "42.090"
// 指定有效数位的显示位数
num6.toPrecision(2) // "42"
num6.toPrecision(1) // "4e+1"
num6.toPrecision(3) // "42.1"
num6.toPrecision(4) // "42.09"
// 显示时会进行四舍五入，并且位数不够时添 0
// 转换方法返回的都是字符串
// 较小的数值
let sum1 = 0.1 + 0.2
let num7 = 0.3
console.log(sum1 == num7) // false
// 解决办法：判断两个数值是否相等，判断其差值是否小于 2^-52(Number.EPSILON)
console.log(sum1 - num7 < Math.pow(2, -52)) // true
console.log(sum1 - num7 < Number.EPSILON)
// 2^53 - 1 < num < -(2^53 - 1)
// TODO 整数的安全范围
// 超过该范围则不精确？
let num8 = Math.pow(2, 53)
console.log('num8', num8)
// 整数判断
let num9 = 90.12
let num10 = 90
console.log(Number.isInteger(num9), Number.isInteger(num10)) // false true
function isInteger (num) {
  return typeof num === 'number' && num % 1 === 0
}
console.log(isInteger(num9), isInteger(num10)) // false true
// 判断一个值是否是安全的整数
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)) // true
console.log(Number.isSafeInteger(Math.pow(2, 53))) // false
console.log(Number.isSafeInteger(Math.pow(2, 53) - 1)) // true
// TODO 32位有符号整数

// 特殊数值
// undefined: 指从未赋值
let a = 'random'
console.log(void a, void a === undefined) // undefined true
// 特殊数值
// NaN: 数学运算的操作数不是数字类型或者无法解析为常规的十进制或者十六进制数字时无法返回一个有效数字，则返回 NaN
console.log( 1 * 'asd', 1 * '1') // NaN 1
console.log(Infinity/Infinity) // NaN
// NaN 是唯一一个不等于自身的值
console.log(NaN == NaN) // false
// window.isNaN: 检查NaN、数字或者能否将其转换为数字
// NaN 返回 true, 能转换为数字，则返回 false
// window.isNaN('') // false
// window.isNaN('FASE') // true
// window.isNaN('0') // false
// window.isNaN('1') // false
// window.isNaN(NaN) // true
// Number.isNaN() 只检查是否为 NaN
Number.isNaN(NaN) // true
Number.isNaN(1) // false
Number.isNaN('FA') //false
typeof NaN === 'number'
// Number.isNaN() polyfill
Number.isNaN = function (n) {
  return (typeof n === 'number' && window.isNaN(n))  || (NaN !== NaN)
}
// 无穷数
// 除法运算中分母为0或者-0, 则结果分别为 Infinity, -Infinity
console.log(1/0, 1/-0) // Infinity -Infinity
// 运算结果溢出时结果也会产生为 Infinity
let b = Number.MAX_VALUE
console.log(b + b) // Infinity
console.log(Infinity/Infinity) // NaN: 因为其运算不能转换为数字
// 零值
// javascript运算中会产生 -0
console.log(0/-3) // -0
function isNegZero (n) {
  n = Number(n)
  return (n === 0) && (1/n === -Infinity)
}
// 特殊等式
// NaN与-0在比较的时候有些特别,所以对于它们两个值得判断有些特别
console.log(NaN !== NaN) // true
console.log(-0 === 0) // true
// Object.is()
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
// Object.is() polyfill
Object.is =  function (v1, v2) {
  // 判断-0
  if (v1 === 0 && v2 === 0) {
    return 1/v1 === 1/v2
  } else {
    // 判断NaN
    return v1 !== v2
  }
  return v1 === v2
}

// 值和引用
// 基本类型传递的是值得副本，引用类型传递的是地址的副本
// 由于地址相同，执行的堆中的同一个对象，所以会相互影响
function foo1 (obj) {
  console.log('foo1 obj', obj) // [ 'a', 'b', 'c' ]
  obj.push('new data')
  // 将局部变量 obj 指向其他地址
  obj = ['this is a new obj']
  console.log('after edit', obj) // [ 'this is a new obj' ]
}
let obj1= ['a', 'b', 'c']
foo1(obj1)
console.log('obj1', obj1) // [ 'a', 'b', 'c', 'new data' ]
// 想要修改传入其中的值，不能将其变量赋值为一个新的引用
function foo2(obj) {
  console.log(obj) // [ 'a' ]
  // 只是修改本身的值，而非赋值为新的引用
  obj.length = 0
  obj.push('1', '2')
}
let obj2 = ['a']
foo2(obj2)
console.log(obj2) // [ '1', '2' ]
// 想要函数内部不改变外部的值，传递一个副本进入函数
let obj4 = ['a', 'b', ['c']]
function foo5 (obj) {
  obj.push('d')
  console.log('foo5', obj) // [ 'a', 'b', [ 'c' ], 'd' ]
  obj[2][0] = 'edit' // 修改其中包含的引用属性
}
foo5(obj4.slice())
console.log('obj4', obj4) // [ 'a', 'b', [ 'c' ] ]
// 注意：slice 为浅复制，内部的引用属性值仍然会被修改
// obj4 [ 'a', 'b', [ 'edit' ] ]


// 如果要将基本类型的值传递到函数内并进行更改
// 则需要将该值封装到一个复合值（对象，数组）中，然后将其通过引用的方式传递
let obj3 = {
  a: 'data'
}
function foo3 (obj) {
  obj.a = 'edit a'
}
foo3(obj3)
console.log('obj3', obj3) // obj3 { a: 'edit a' }
// 如果使用内置包装函数
let num11 = 12
let str3 = 'str3'
function foo4 (num) {
  num = num + 1
  console.log('foo num', num)
}
let num12 = new Number(num11)
let num13 = Number(num11)
let num14 = Object(num11)
console.log(num12, num13, num14) // Number {12} 12 Number {12}
foo4(num12) // foo num 13
console.log(num12) // Number {12}
foo4(num13) // foo num 13
console.log(num13) // 12
foo4(num14) // foo num 13
console.log(num14) // Number {12}
// 上面的原因是标量基本类型值是不可更改的（数字，字符串，布尔值）
