// 抽象值操作
// ToStirng
// 基本类型的字符串转换规则:
// null -> "null", undefined -> "undefined", true -> "true", NaN -> "NaN"
String(null) // "null"
String(undefined) // "undefined"
String(NaN) // "NaN"
String(0) // "0"
String(function () {}) // "function () {}"
// 普通对象除非自定义 toString() 方法，否则返回内部属性 [[Class]] 的值
String({}) // "[object Object]"
// 数组的默认 toStirng() 经过重新定义，将所有单元字符串串化后再用","连接起来
[0].toString() // "0"
// [].toString() // ""
// [1, 2, 3, [4, [5, 6]]].toString() //"1,2,3,4,5,6"

// JSON 字符串化
// 工具函数 JSON.stringify 在将 JSON 对象序列化为字符串的时候也用到了 ToString
// JSON.stringify 在对象中遇到 undefined, function, symbol 的时候会自动忽略，在数组中会返回null占位
JSON.stringify([1, undefined, null, function () {}]) // "[1,null,null,null]"
JSON.stringify({
  a: 'a',
  b: null,
  c: undefined,
  d: NaN,
  f: function () {}
})
// "{"a":"a","b":null,"d":null}"
JSON.stringify(NaN) // "null"
String(NaN) // "NaN"
// 在对象中定义 toJSON() 方法，在JSON.stringify() 时会被调用，然后再被进行字符串化
var obj2 = {
  a: [1, 2, 3],
  toJSON: function () {
    return this.a.slice(1) // return [2, 3]
  }
}
JSON.stringify(obj2) // "[2,3]"

// JSON.stringify(obj, replacer, space)
// replacer: 数组，必须为一个字符串数组，包含序列化要处理的属性，其他则被忽略, 需要按照在对象中的层级进行放置
// replacer: 函数，会对对象本身调用一次，然后对对象中的每个属性调用一次，要忽略某个值，则返回 undefined
var obj2 = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd'
  }
}
JSON.stringify(obj2, ['a', 'd']) // "{"a":"a"}"
JSON.stringify(obj2, ['a', 'c']) // "{"a":"a","c":{}}"
JSON.stringify(obj2, ['a', 'c', 'd']) // "{"a":"a","c":{"d":"d"}}"
JSON.stringify(obj2, function (k, v) {
  console.log(k,v)
  return v
})
// {a: "a", b: "b", c: {…}}
// a a
// b b
// c {d: "d"}
// "{"a":"a","b":"b","c":{"d":"d"}}"
var obj2 = {
  a: {
    e: 'f'
  },
  b: 'b',
  c: {
    d: 'd'
  }
}
JSON.stringify(obj2, function (k, v) {
  console.log(k,v)
  return v
})
// 深度优先，依次对对象本身以及属性调用函数
//  {a: {…}, b: "b", c: {…}}
//  a {e: "f"}
//  e f
//  b b
//  c {d: "d"}
//  2 d d
// "{"a":{"e":"f"},"b":"b","c":{"d":"d"}}"

// space: 用来指定输出的缩进格式, 可以是正整数和字符串


// ToNumber
// true -> 1, false -> 0, null -> 0, undefined -> NaN, NaN -> NaN
// 对象或者数组会先转换为基本类型值（调用valueOf/toString方法），再转换为数字
// 由于对象/数组的valueOf返回的都是本身的值(除非自定义 valueOf 方法)，所以最后会调用 toString() 方法
obj2.valueOf() // {a: {…}, b: "b", c: {…}} 返回本身
obj2.toString() // "[object Object]"
Number(obj2.toString()) // NaN
let arr1 = [1]
arr1.valueOf() // [1]
arr1.toString() // "1"
// 如果为对象和数组自定义了 valueOf 与 toString 方法，那么在转换为数字类型时会先调用 valueOf 方法，
// 若 valueOf 返回基本类型，则转换为数字，否则，调用 toString 方法
var a = {
  valueOf: function () {
    return '42'
  },
  toString: function () {
    return '41'
  }
}
Number(a) // 42
var c = [4, 1]
c.valueOf = function () {
  return '42'
}
c.toString = function () {
  return '41'
}
Number(c) // 42
// valueOf 返回的不为基本类型，则调用 toString方法
var d = {
  toString: function () {
    return '41'
  }
}
Number(d) // 41
