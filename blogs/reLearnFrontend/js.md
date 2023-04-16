---
title: JS
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

## 对原型、原型链的理解

- 在 JavaScript 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，它的属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说不应该能够获取到这个值的，但是现在浏览器中都实现了 proto 属性来访问这个属性，但是最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，可以通过这个方法来获取对象的原型。
- 当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是新建的对象为什么能够使用 toString() 等方法的原因。
- 特点：JavaScript 对象是通过引用来传递的，创建的每个新对象实体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对象也会继承这一改变。

## 执行上下文/作用域链/闭包

- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

## this对象

- this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。
- 函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。
- 使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。

## all/apply/bind

- apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。`function.apply(obj, [arg1, arg2, ...])`
- call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。`function.call(obj, arg1, arg2, ...)`
- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。`var newBindFunc = function.bind(obj, arg1, arg2, ...); newBindFunc(arg_n)`,新函数的参数会拼接到绑定时传参的后面，新函数作为构造函数时，绑定的 this 会实效，this 指向构造函数生产的新对象。

```js
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

## Promise

- Promise 是异步编程的一种解决方案,它是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
- 特点1、对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 特点2、一旦状态改变，就不会再变，Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

- Promise有五个常用的方法：then()、catch()、all()、race()、finally。

## JavaScript 运行机制

- 所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
- （1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
- （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
- （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- （4）主线程不断重复上面的第三步。
<!-- commit test123 -->
