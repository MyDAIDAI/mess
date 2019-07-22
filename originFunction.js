// 原生函数
// Number() String() Boolean() Array() Function() Object() Error() Date() Symbol()
let str1 = new String('123')
let str2 = String('123')
console.log(typeof str1, typeof str2) // 'object' 'string'
console.log(str1 instanceof String, str2 instanceof String) // true false
console.log(Object.prototype.toString.call(str1), Object.prototype.toString.call(str2)) // '[object String]' '[object String]'

// 内部属性 [[Class]]
// 所有 typeof 返回值为 'object'的对象都包含一个内部属性[[Class]]
// 内部属性 [[Class]] 无法直接访问，一般通过 Object.prototype.toString.call(...)来查看
// 多数情况 [[Class]] 属性与创建该对象的原生构造函数相对应, 但 null, undefined 没有构造函数，但仍返回 Null, Undefined
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call(undefined))  // [object Undefined]
// 对于其他基本类型值，会被各自的封装对象自动包装
console.log(Object.prototype.toString.call(123)) // [object Number]
console.log(Object.prototype.toString.call('123')) // [object String]

// 封装对象包装
// 基本类型值没有 length 等属性与方法，需要通过包装对象才能进行访问
// js会自动为基本类型值包装一个封装对象
let str3 = 'str3'
console.log(str3.length) // 4
let str4 = new String('str4')
console.log(str4) // String {"str4"}
console.log(str4.valueOf()) // 'str4'
// 在使用封装对象的时候，会产生一些陷阱，需要谨慎使用
let is1 = new Boolean(false)
console.log('is1', is1) // Boolean {false}
if (!is1) {
  console.log('is1 is false')
}
// 上面的代码不会执行，因为 is1 是一个对象，对象本身为真值
// 如果需要判断一个布尔的包装对象值，需要调用其 valueOf() 方法
if (!is1.valueOf()) {
  console.log('use is1 valueof') // use is1 valueof
}

// 拆封
// 如果想要得到封装对象中的基本类型值，可以使用 valueOf() 函数
let str5 = new String('str5')
let num1 = new Number(1)
let is2 = new Boolean(false)
console.log(str5.valueOf(), num1.valueOf(), is2.valueOf()) // str5 1 false
// 在需要使用封装对象的基本类型值时，会发生隐式拆分
let str6 = str5 + ' str6'
console.log(str5, str6) // String {'str5'} 'str5 str6'

// 使用构造函数创造数组
// 使用Array构造函数只带一个参数的时候，该参数会被作为数组的长度而非数组元素
// 需要注意的是，数组并没有预设长度的概念，这样创建出来的是一个空数组，只是其 length 属性被设置为了指定的值
// 稀疏数组：包含至少一个空单元的数组
let arr1 = new Array(3)
let arr2 = [undefined, undefined, undefined]
console.log(arr1, arr2) // [ <3 empty items> ] [ undefined, undefined, undefined ]
// arr1与arr2行为有时会不同
console.log(arr1.join('-'), arr2.join('-')) // -- --
console.log(arr1.map((ele, index) => index), arr2.map((ele, index) => index)) //[ <3 empty items> ] [ 0, 1, 2 ]
// 在包含值得稀疏数组中，对于存在的值会执行，不存在的值仍返回 empty
let arr4 = new Array(3)
arr4[0] = '1'
arr4[2] = '2'
console.log('====arr4 map ====')
console.log(arr4.map((ele, index) => index)) // [ 0, <1 empty item>, 2 ]
// 产生上面的原因是，arr1中不存在任何的单元，所以 map 函数无从遍历，join 函数的实现与 map 不同
// 下面是 join 的实现方式
function fakeJoin(arr, connector) {
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) {
      str += connector
    }
    if (arr[i] !== undefined) {
      str += arr[i]
    }
  }
  return str
}
console.log(fakeJoin(arr1, '-')) // --
// 从上面的函数可以看出，join 方法会首先假定数组不会空，通过 length 属性进行遍历
// 可以通过下面的方式创建包含 undefined 单元（非空单元）的数组
let arr3 = Array.apply(null, {length: 3})
console.log('arr3', arr3) // [ undefined, undefined, undefined ]
// 上面的代码中可以假设在 apply 内部有一个 for 循环，从 0 一直执行到 length
// 然后依次去取对应属性值，由于值不存在，则会赋值为 undefined, 所以会产生 [undefined, undefined, undefinedJSO]
