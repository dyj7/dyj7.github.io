---
title: CSS
date: 2023-02-10
tags:
 - reLearnFrontend
categories:
 - reLearnFrontend
---

## 数据类型

- Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）

## 数据类型检测

- typeof

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object
```

- instanceof (判断在其原型链中能否找到该类型的原型。)

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false
console.log('str' instanceof String);                // false

console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

- Object.prototype.toString.call()

```js
var a = Object.prototype.toString;

console.log(a.call(2)); // [object Number]
console.log(a.call(true));  // [object Boolean]
console.log(a.call('str')); // [object String]
console.log(a.call([]));    // [object Array]
console.log(a.call(function(){})); // [object Function]
console.log(a.call({}));    // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null));  // [object Null]
```

## JavaScript 中的包装类型

- 基本类型是没有属性和方法的，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象

```js
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

## object.assign和扩展运算法

- Object.assign()方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改了一个对象，因此会触发 ES6 setter。
- 扩展操作符（…）使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。不会复制继承的属性或类的属性。

## new操作符的实现原理

- 首先创建了一个新的空对象
- 设置原型，将对象的原型设置为函数的 prototype 对象。
- 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
- 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

## var let const

- 块级作用域： 块作用域由 { }包括，let和const具有块级作用域，var不存在块级作用域。
- 变量提升： var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。
- 给全局添加属性： 浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会
- 重复声明： var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。
- 暂时性死区： 在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区。使用var声明的变量不存在暂时性死区。
- 初始值设置： 在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。
- 指针指向： let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

## 箭头函数与普通函数的区别

- 箭头函数没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。
- 箭头函数继承来的this指向永远不会改变

  ```js
  var id = 'GLOBAL';
  var obj = {
    id: 'OBJ',
    a: function(){
      // 谁调用 a 就 this 就指向谁
      console.log(this.id);
    },
    b: () => {
      // this 指向全局对象
      console.log(this.id);
    }
  };
  obj.a();    // 'OBJ'
  obj.b();    // 'GLOBAL'
  new obj.a()  // undefined
  new obj.b()  // Uncaught TypeError: obj.b is not a constructor
  ```

- call()、apply()、bind()等方法不能改变箭头函数中this的指向
- 箭头函数不能作为构造函数使用
- 箭头函数没有自己的 arguments 和 prototype

## 数组原生方法

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法
- 数组归并方法 reduce() 和 reduceRight() 方法
