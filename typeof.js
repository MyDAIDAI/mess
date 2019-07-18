console.log(typeof null)
console.log(typeof function () {})
let a = null
// true
// 检查 a 的值是否为 null
console.log(!a && typeof a === 'object') // true
var b
// typeof 对未声明的变量不会报错，会返回 'undefined'
// typeof 对声明了未赋值的变量也返回 'undefined'
console.log(b, typeof c, typeof b) // undefined 'undefined' 'undefined'
