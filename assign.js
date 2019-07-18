
// 模拟 assign 实现
// 由于直接在 Object 上挂载属性，默认是可枚举的，所以使用 Object.defineProperty() 来设置其属性描述符
// 1. 判断对象上是否存在 assign 方法，不存在则定义
// 2. 使用 Object.defineProperty() 向 Object 中添加方法
// 3. 使用 for...in 遍历可枚举的属性
// 4. 使用 Object.hasOwnProperty 判断是否是自身属性

if (typeof Object.assign2 !== 'function') {
  Object.defineProperty(Object, 'assign2', {
    value: function (target, varArgs) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      let to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index]
        if (nextSource != null) {
          for (let nextKey in nextSource) {
            // 使用Object.prototype.hasOwnProperty.call()是避免使用 Object.create(null)所创建的对象没有继承  Object 原型中的方法
            // 也就没有 hasOwnProperty 方法
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true,
    enumerable: false
  })
}

let a = {
  name: 'a',
  age: 18
}
let b = {
  b1: Symbol('b'),
  b2: null,
  b3: undefined
}
let c = Object.assign2(a, b)
console.log('c', c, c === a)
