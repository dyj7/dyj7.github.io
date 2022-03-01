---
title: Array
date: 2022-02-28
tags:
 - js
categories:
 - js
---

## 数组原生方法

### 检测数组

- `arr instanceof Array`
- `Array.isArray(arr)`
- `Object.prototype.toString.call(arr); // '[object Array]'`

### 转换方法

```js
const colors = ['red','blue','green']
// valueOf() 方法返回指定对象的原始值。
colors.valueOf() //['red','blue','green']
// arr.toString() 与 arr.join()输出相同，不过join里可以输入其它链接符
colors.toString() //"red,blue,green"
```

### push、pop、unshift、shift

```js
// arr.push(item) 接受任意数量的参数，添加到数组末尾，返回新数组的长度
const colors = ['red']
colors.push('blue','green'); //3

// arr.pop() 删除数组最后一项，返回删除的项
const colors = ['blue','green']
colors.pop() //green

// arr.unshift() 接受任意数量的参数，添加到数组头部，返回新数组的长度
const colors = ['red']
colors.unshift('blue','green') //3, colors:['blue', 'green', 'red']

// arr.shift() 删除数组第一项，返回删除的项
const colors = ['blue','green']
colors.shift() //blue, colors:['green']
```

### reverse、sort、concat、slice、 splice

```js
// arr.reverse() 反转数组的顺序，并返回重新排序之后的数组， 原数组会被改变
const arr1 = [1,2,3,'red','blue']
arr1.reverse() //["blue", "red", 3, 2, 1]

// arr.sort() 如果不传参数，默认情况下数组内的元素会被转换为字符串进行比较，返回值为排序后的新数组。原数组会被改变
const b = [1,2,3]
//升序
b.sort((a,b)=>a-b) //[1, 2, 3]
//降序
b.sort((a,b)=>b-a) //[3, 2, 1]

// arr.concat() 传递一个元素（数组）或多个元素（数组）,会将其合并到arr中，返回新数组，原数组不变
const colors = ['red','blue','green']
colors.concat('gray',['a','green'])  //["red", "blue", "green", "gray", "a", "green"]
// js数组复制(浅拷贝)：arr.concat(); [...arr]; Array.from(arr)

// arr.slice 剪切数组，返回剪切之后的数组，元素不会改变
// 传入一个参数，表示起始位置，结束位置为最末尾,传入2个参数，表示起始位置与结束位置，但不包括结束位置所在的元素
const colors = ['red','blue','green']
colors.slice(1) //['blue', 'green']
colors.slice(1,2) //['blue']

// 替换：arr.splice(index, num, item) [起始位置 | 要删除的项数 | 要插入的任意项数]， 最终返回删除掉的元素组成的数组
const colors = ["red", "gray", "blue", "green"]
colors.splice(2,2,'yellow') // ["blue", "green"]
console.log(colors); //["red", "gray", "yellow"]
```

### 查找元素

```js
// arr.indexOf() 验证数组中是否含有某个元素，返回第一个匹配到的元素在数组中所在的位置，如果没有，则返回 -1
const colors =  ["red", "gray", "yellow"]
colors.indexOf('gray') // 1
colors.indexOf('mm') //-1

// arr.lastIndexOf() 验证数组中是否含有某个元素，不过是从数组尾部开始查找，返回第一个匹配到的元素所在的位置，如果没有，则返回-1
const colors =  ["red", "gray", "yellow","gray"]
colors.indexOf('gray') // 3
colors.lastIndexOf('mm') //-1
```

### 迭代方法

```js
arr.every() // 检查数组中的项是否满足某个条件，传入的函数对每一项都返回true,则返回true
const arr = [1,2,3,4,5,4,3,2,1]
arr.every((item, index, arr)=> item >2 ) //false

arr.some() // 检查数组中的项是否满足某个条件，只要传入的函数对数组中某一项返回true,则返回true
const arr = [1,2,3,4,5,4,3,2,1]
arr.some((item, index, arr)=> item >2 ) //true

arr.filter() // 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的新数组
const arr = [1,2,3,4,5,4,3,2,1]
arr.filter((item, index, arr)=> item >2 ) //[3, 4, 5, 4, 3]

arr.map() // 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的新数组
const arr = [1,2,3,4,5,4,3,2,1]
arr.map((item, index, arr)=> item * 2 ) // [2, 4, 6, 8, 10, 8, 6, 4, 2]

arr.forEach() //对数组中的每一项运行给定函数，这个方法没有返回值
const arr = [1,2,3,4,5,4,3,2,1]
arr.forEach((item, index, arr)=> item * 2 ) // undefined

// tips： map、forEach里不可以使用continue、break ,每一项都会执行，如果遍历中要用到continue或break提升效率，则可以使用for()循环 或 for...of..循环
```

### 归并操作

```js
arr.reduce() //[前一个值 | 当前值 | 项的索引 | 数组对象本身]
const arr = [1,2,3,4,5]
arr.reduce((prev,cur,index,arr)=>prev+cur) //15

arr.reduceRight()
const arr = [1,2,3,4,5]
arr.reduceRight((prev,cur,index,arr)=>prev+cur) //15
```

### ES6数组方法扩展

```js
// 求一个数组中最大元素
//ES5的写法
Math.max.apply(null,[1,3,6]) ///6
//ES6的写法
Math.max(...[1,3,6]) //6

// 合并数组
//ES5写法
const arr = [4,5]
[1,2].concat(arr) //[1, 2, 4, 5]
//ES6写法
const arr = [4,5]
[1,2,...arr]

//将字符串转化为数组
Array.from('hello') //["h", "e", "l", "l", "o"]

Array.of()
Array.of(2,3,5) //[2,3,5]
Array.of(2) //[2]

arr.find() arr.findIndex()
[1,4,9,10,15].find((item, index, arr)=>{
    return item > 9;
}) //10
[1,4,9,10,15].findIndex((item, index, arr)=>{
    return item > 10;
}) //4

arr.includes() //数组是否包含某个值，返回true 或 false

for...of...
for(let item of colors){
    console.log(item) // red,gray,yellow
}
```
