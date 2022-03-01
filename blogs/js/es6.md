---
title: ES6
date: 2022-01-12
tags:
 - ES6
 - js
categories:
 - js
---

## let - const

- ES6 声明变量的六种方法
- ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。
- 顶层对象：
- 在浏览器中是指window,在node指的是global
- ES5之前顶层对象的属性和全局变量等价
- ES 6之后全局变量步与顶层对象的属性脱钩。
- ES2020引入 globalThis作为顶层对象

```js
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function
// 块级作用域中的func类似于var 声明的变量，会存在提升
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// Uncaught TypeError: f is not a function

// cosnt 变量指向的内存地址，保存的只是一个指向实际数据的指针
```

## 变量的解构赋值

### 数组

- 只要等号两边的模式相同，左边的变量就会被赋予对应的值
- 如果解构不成功，变量的值就等于undefined。
- 解构赋值允许指定默认值。

```js
let [x, ,y, q=1,...z] = ['a'，'b'];
x // "a"
y // undefined
z // []
q // 1
// Set 结构，也可以使用数组的解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);
```

### 对象

- 对象的属性没有次序，变量必须与属性同名

```js
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]
```

### 字符串

```js
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

### 函数参数

```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

### 用处

```js
// （1）.交换变量值
let x = 1,y = 2; [x,y] = [y,x]
// （2）从函数返回多个值
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// （3）提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
```

## 字符串扩展

- 模板字符串 `<div> time :${time}}</div>`

## 数值的扩展

```js
Number.isFinite(), Number.isNaN()
Number.parseInt(), Number.parseFloat()
Number.isInteger()
Number.EPSILON Math.abs(0.1+0.2-0.3) <= Number.EPSILON
// 安全整数和 Number.isSafeInteger()
// 指数运算符 2**3==8
// BigInt 数据类型
```

## 函数的扩展

- 函数参数的默认值
    指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数（在设置默认值参数前的参数的个数）。
- rest 参数

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
```

- 箭头函数
    - 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
    - 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
    - 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
    - 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
- 尾调用优化
- 函数参数的尾逗号
- Function.prototype.toString()

## 数组的扩展

```js
// （1）
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
// （2）
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
// （3）
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
// （4） 数组实例的 find() 和 findIndex()
// （5）
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
// （6）
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

## 对象的扩展

```js
Object.assign() //方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

## set map

- Set 类似于数组，但是成员的值都是唯一的，没有重复的值。(WeakSet 的成员只能是对象)

```js
Set.prototype.add(value) // 添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)// 删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)// 返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()// 清除所有成员，没有返回值。
Set.prototype.size// 返回Set实例的成员总数。
Set.prototype.keys()// 返回键名的遍历器
Set.prototype.values()// 返回键值的遍历器
Set.prototype.entries()// 返回键值对的遍历器
Set.prototype.forEach()// 使用回调函数遍历每个成员
```

```js
Map本质上是键值对的集合（Hash 结构)
size属性返回 Map 结构的成员总数。
set(key, value)/get(key)/has(key)/delete(key)/clear()
Map 的遍历顺序就是插入顺序。
WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
WeakMap的键名所指向的对象，不计入垃圾回收机制。
```

## class

- 类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。
- 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。
- 类中所定义的方法，都放在了类的原型对象上，供实例去使用。
- static创建静态属性，Person.age=100

```js
  //创建一个Person类
        class Person {
            //构造器方法
            constructor(name,age){
                //构造器中的this是谁？—— 类的实例对象
                this.name = name
                this.age = age
            }
            //一般方法
            speak(){
                //speak方法放在了哪里？——类的原型对象上，供实例使用
                //通过Person实例调用speak时，speak中的this就是Person实例
                console.log(`我叫${this.name}，我年龄是${this.age}`);
            }
        }
        //创建一个Student类，继承于Person类
        class Student extends Person {
            constructor(name,age,grade){
                super(name,age)
                this.grade = grade
                this.school = '111'
            }
            //重写从父类继承过来的方法
            speak(){
                console.log(`我叫${this.name}，我年龄是${this.age},我读的是${this.grade}年级`);
                this.study()
            }
            study(){
                //study方法放在了哪里？——类的原型对象上，供实例使用
                //通过Student实例调用study时，study中的this就是Student实例
                console.log('我很努力的学习');
            }
        }
```
