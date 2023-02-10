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
