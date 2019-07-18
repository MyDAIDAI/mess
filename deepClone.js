// 深拷贝

// 这是一个浅拷贝
function cloneShallow(source) {
  let target = {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}
function isObject (obj) {
  return typeof obj === 'object' && obj != null
}

// 兼容数组的深拷贝
function cloneDeep (source) {
  if (!isObject(source)) {
    return source
  }
  let target = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

// 处理循环引用的问题
// 将引用的值保存起来，下次引用检查是否存在，存在则使用已保存的值
function cloneDeep2 (source, hash = new WeakMap()) {
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  let target = Array.isArray(source) ? [] : {}
  hash.set(source, target)
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep2(source[key], hash)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

let a = {
  name: 'a',
  book: {
    price: 45
  },
  a1: null,
  a2: undefined,
  a3: Symbol('123'),
  a4: [1, 2, 3]
}
a.circleRef = a
let b = cloneDeep2(a)
b.book.price = 55
b.a4[0] = 2
console.log(b, a)

// 将递归转为循环，解决数据量大的爆栈问题
function cloneDeep3 (source, hash = new WeakMap()) {
  let root = {}
  let loopList = {
    parent: root,
    key: undefined,
    data: source
  }
  while (loopList.length) {
    let node = loopList.pop()
    let key = node.key
    let data = node.data

    let res = parent
    if (key !== undefined) {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }
    if (hash.get(data)) {
      parent[key] = hash.get(data)
      break
    }
    hash.set(data, res)
    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (isObject(data[k])) {
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}
