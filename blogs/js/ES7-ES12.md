---
title: ES6
date: 2022-03-24
tags:
 - js
categories:
 - js
---

## ES2016(ES7)

### Array.prototype.includes()

- includes() 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回 false。

```js
arr.includes(valueToFind[, fromIndex])
// valueToFind，需要查找的元素值。
// fromIndex 可选 从fromIndex 索引处开始查找 valueToFind。如果为负值（即从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7')) // true
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes("es7", -1)); // false
console.log(arr.includes("es7", -2)); // true
```

### 幂运算符 **

- 想求2的10次方？

```js
// 自己写函数实现
function pow(x, y) {
    let result = 1
    for (let i = 0; i < y; i++) {
        result *= x
    }
    return result
}
console.log(pow(2, 10)) // 1024
// Math.pow()
console.log(Math.pow(2, 10)); // 1024
// 幂运算符 **(幂运算符的两个*号之间不能出现空格，否则语法会报错)
console.log(2 ** 10); // 1024
```

## ES2017(ES8)

### Object.values()

- Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = {
  name: "aaa",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'aaa', 18, 188 ]
```

### Object.entries()

- Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```
