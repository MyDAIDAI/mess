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

