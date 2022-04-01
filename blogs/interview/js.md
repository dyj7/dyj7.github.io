---
title: JavaScript  面试知识点总结
date: 2021-01-01
tags:
 - interview
categories:
 - interview
---

## js 有几种类型的值

- 基本数据类型， Undefined、Null、Boolean、Number、String, ES6 中新增的 Symbol 和 ES10 中新增的 BigInt 类型(原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。)
    - Symbol 代表创建后独一无二且不可变的数据类型，它的出现主要是为了解决可能出现的全局变量冲突的问题。
    - BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。
- 引用数据类型 Object:Array、Date、Function、RegExp,(引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。)

## 什么是堆？什么是栈？它们之间有什么区别和联系

- 堆和栈的概念存在于数据结构中和操作系统内存中。
- 在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。
- 在操作系统中，内存被分为栈区和堆区。
- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

## js 有哪些内置对象

- 值属性：Infinity、NaN、undefined、null
- 函数属性：eval()、parseFloat()、parseInt()
- 基本对象：Object、Function、Boolean、Symbol、Error
- 数字和日期对象：Number、Math、Date
- 字符串：String、RegExp
- 可索引的集合对象：Array
- 使用键的集合对象：Map、Set、WeakMap、WeakSet
- 结构化数据: json
- 控制抽象对象: Promise、Generator
- 反射：Reflect、Proxy

## undefined 与 undeclared 的区别

- 已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明过的变量，是 undeclared 的。
- 对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

## null 和 undefined 的区别

- Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。
- undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null,主要用于赋值给一些可能会返回对象的变量，作为初始化。
- typeof undefined -> 'undefined'; typeof null -> 'object'

## 原型，原型链

- 在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说我们是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。
- 当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype

```js
const Parent = function(){
}
//定义一个函数，那它只是一个普通的函数，下面我们让这个函数变得不普通
const p1 = new Parent();
//这时这个Parent就不是普通的函数了，它现在是一个构造函数。因为通过new关键字调用了它
//创建了一个Parent构造函数的实例 p1
```

<img src='./imgs/js-1.png'>

## js 获取原型的方法

- `p.__proto__`
- `p.constructor.prototype`
- `Object.getPrototypeOf(p)`

## typeof NaN

- `typeof NaN`; // "number"
- NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 `NaN != NaN` 为 true。

## isNaN 和 Number.isNaN 区别

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值(`Number()`)，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。

## Number.isNaN() 的 polyfill

```js
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return (
      typeof n === "number" &&
      window.isNaN( n )
    );
  };
}
```

```js
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}
```

## Array 构造函数只有一个参数值时的表现

- Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度,这样创建出来的是一个空数组。
- 构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。

## 内部属性 [[Class]]

- 所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]
- 这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看
- `Object.prototype.toString.call( [1,2,3] ); '[object Array]'`
- 自己创建的类情况类的[[Class]]返回`[object Object]`
- 定制[[Class]]

    ````js
    class Class2 {
    get [Symbol.toStringTag]() {
        return "Class2";
      }
    }
    Object.prototype.toString.call(new Class2()); // "[object Class2]"
    ````

## 其他值到字符串的转换规则

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

## 其他值到数字值的转换规则

- Undefined 类型的值转换为 NaN。
- Null 类型的值转换为 0。
- Boolean 类型的值，true 转换为 1，false 转换为 0。
- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- Symbol 类型的值不能转换为数字，会报错。
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。
- 为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

## 其他值到布尔类型的值的转换规则

- 假值: `null,undefined,0(-0,+0),NaN,'',false`

## {} 和 [] 的 valueOf 和 toString 的结果

- {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
- [] 的 valueOf 结果为 [] ，toString 的结果为 ""

## 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字,区别是什么？

- 解析允许字符串（如 parseInt() ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。
- 转换（如 Number ()）不允许出现非数字字符，否则会失败并返回 NaN。

## This 对象的理解 (this 指向最后一次调用这个方法的对象)

- this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。
- 函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。

## 事件委托

- 事件委托本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。
- 使用事件代理可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。

## 什么是闭包

- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。
- 闭包的第一个用途是在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
- 函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

## 判断一个对象是否属于某个类

- instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
- 通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。
- 使用 Object.prototype.toString() 方法来打印对象的[[Class]] 属性来进行判断。

## new 操作符具体干了什么

1. 首先创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象。
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
  let newObject = null,
    constructor = Array.prototype.shift.call(arguments),
    result = null;

  // 参数判断
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }

  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);

  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);

  // 判断返回对象
  let flag =
    result && (typeof result === "object" || typeof result === "function");

  // 判断返回结果
  return flag ? result : newObject;
}

// 使用方法
// objectFactory(构造函数, 初始化参数);
```

## JSON 的了解

- JSON 是一种数据交换格式，基于文本，优于轻量，用于交换数据。
- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。
- JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构

## js 延迟加载的方式

- 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
- 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- 动态创建 DOM 标签的方式，对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

## Ajax

- 异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。

```js
// promise 封装实现：
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}
```

## 浏览器的缓存机制

- 浏览器的缓存机制指的是通过在一段时间内保留已接收到的 web 资源的一个副本，如果在资源的有效时间内，发起了对这个资源的再一次请求，那么浏览器会直接使用缓存的副本，而不是向服务器发起请求。使用 web 缓存可以有效地提高页面的打开速度，减少不必要的网络带宽的消耗。
- web 资源的缓存策略一般由服务器来指定，可以分为两种，分别是强缓存策略和协商缓存策略。

### 强缓存策略

- 使用强缓存策略时，如果缓存资源有效，则直接使用缓存资源，不必再向服务器发起请求。强缓存策略可以通过两种方式来设置，分别是 http 头信息中的 Expires 属性和 Cache-Control 属性。
- 服务器通过在响应头中添加 Expires 属性，来指定资源的过期时间。在过期时间以内，该资源可以被缓存使用，不必再向服务器发送请求。这个时间是一个绝对时间，它是服务器的时间，因此可能存在这样的问题，就是客户端的时间和服务器端的时间不一致，或者用户可以对客户端时间进行修改的情况，这样就可能会影响缓存命中的结果。
- Expires 是 http1.0 中的方式，因为它的一些缺点，在 http 1.1 中提出了一个新的头部属性就是 Cache-Control 属性，它提供了对资源的缓存的更精确的控制。它有很多不同的值，常用的可以通过设置 max-age 来指定资源能够被缓存的时间的大小，这是一个相对的时间，它会根据这个时间的大小和资源第一次请求时的时间来计算出资源过期的时间，因此相对于 Expires来说，这种方式更加有效一些。常用的还有比如 private ，用来规定资源只能被客户端缓存，不能够代理服务器所缓存。还有如 no-store ，用来指定资源不能够被缓存，no-cache 代表该资源能够被缓存，但是立即失效，每次都需要向服务器发起请求。
- 一般来说只需要设置其中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires 。

### 协商缓存策略

- 使用协商缓存策略时，会先向服务器发送一个请求，如果资源没有发生修改，则返回一个 304 状态，让浏览器使用本地的缓存副本。
- 如果资源发生了修改，则返回修改后的资源。协商缓存也可以通过两种方式来设置，分别是 http 头信息中的 Etag 和 Last-Modified 属性。
- 服务器通过在响应头中添加 Last-Modified 属性来指出资源最后一次修改的时间，当浏览器下一次发起请求时，会在请求头中添加一个 If-Modified-Since 的属性，属性值为上一次资源返回时的 Last-Modified 的值。当请求发送到服务器后服务器会通过这个属性来和资源的最后一次的修改时间来进行比较，以此来判断资源是否做了修改。如果资源没有修改，那么返回 304 状态，让客户端使用本地的缓存。如果资源已经被修改了，则返回修改后的资源。使用这种方法有一个缺点，就是 Last-Modified 标注的最后修改时间只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，那么文件已将改变了但是 Last-Modified 却没有改变，这样会造成缓存命中的不准确。
- 因为 Last-Modified 的这种可能发生的不准确性，http 中提供了另外一种方式，那就是 Etag 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified 的方式更加精确。
- 当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保持一致，因为每个服务器上 Etag 的值都不一样，因此在考虑负载平衡时，最好不要设置 Etag 属性。
- 强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于协商缓存会向服务器发送一次请求。它们缓存不命中时，都会向服务器发送请求来获取资源。在实际的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。

## 同步和异步的区别

- 同步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会一直等待下去，直到消息返回为止再继续向下执行。
- 异步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等待消息的返回，当消息返回时系统再通知进程进行处理。

## 浏览器的同源政策

- 一个域下的 js 脚本在未经允许的情况下，不能够访问另一个域的内容。这里的同源的指的是两个域的协议、域名、端口号必须相同，否则则不属于同一个域。
- 同源政策主要限制了三个方面
    - 当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。
    - 当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。
    - 当前域下 ajax 无法发送跨域请求。
- 同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img、或者script 脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作。

## 如何解决跨域问题

- 使用 jsonp 来实现跨域请求，通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制。通过在请求的 url 后指定一个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式只能用于 get 请求。

  ```js
  <script>
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // 传参一个回调函数名给后端，后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);
    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }
  </script>
  // 服务端返回
  handleCallback({"status": true, "user": "admin"})
  ```

- 只想要实现主域名下的不同子域名的跨域操作,将 document.domain 设置为主域名（基础域名），来实现相同子域名的跨域操作，此时主域名下的 cookie 就能够被子域名所访问。（ aaa.ccc.com 与 bbb.ccc.com :aaa里的一个网页（a.html）引入了bbb 里的一个网页（b.html），a.html里与b.html里都加入`document.domain = "ccc.com";`就可实现 a.html 与 b.html的通信）
- 发送 `postMessage(data,origin);` 接收：`window.addEventListener('message', function(e) {console.log(e.data);})`

### 跨源资源共享（CORS）它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

- 对于简单请求，浏览器直接发出CORS请求,在头信息之中，增加一个Origin字段，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
- 如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，会抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
- 非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求，浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

## cookie

- cookie 是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的 cookie 值添加到请求头部，发送给服务端。这可以用来实现记录用户登录状态等功能。cookie 一般可以存储 4k 大小的数据，并且只能够被同源的网页所共享访问。服务器端可以使用 Set-Cookie 的响应头部来配置 cookie 信息。一条cookie 包括了9个属性值 name、value、expires、domain、path、secure、HttpOnly、SameSite、Priority。其中 name 和 value 分别是 cookie 的名字和值。expires 指定了 cookie 失效的时间，domain 是域名、path是路径，domain 和 path 一起限制了 cookie 能够被哪些 url 访问。secure 规定了 cookie 只能在确保安全的情况下传输，HttpOnly 规定了这个 cookie 只能被服务器访问，不能使用 js 脚本访问。SameSite 属性用来限制第三方 cookie，可以有效防止 CSRF 攻击，从而减少安全风险。Priority 是 chrome 的提案，定义了三种优先级，当 cookie 数量超出时低优先级的 cookie 会被优先清除。在发生 xhr 的跨域请求的时候，即使是同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。
- 设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie

## [JavaScript 中的作用域与变量声明提升](https://dyj7.github.io/blogs/js/imgs/scopeAndScopeChian.html)

- JavaScript是一种函数级作用域（function-level scope），作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。（ES6 之前 JavaScript 没有块级作用域,只有全局作用域和函数作用域。ES6 的到来，提供了‘块级作用域’,可通过新增命令 let 和 const 来体现。）
- 变量提升的表现是，无论我们在函数中何处位置声明的变量，都被提升到了函数的首部，可以在变量声明前访问到而不会报错。
- 造成变量声明提升的本质原因是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当访问一个变量时，会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。这就是会出现变量声明提升的根本原因。
- 块级作用域
    - 在一个函数内部
    - 在一个代码块（由一对花括号包裹）内部
    - 声明变量不会提升到代码块顶部（在声明前使用会出现暂时性死区）
    - 禁止重复声明
- 作用域链：当前作用域没有定义的变量称为自由变量，会向父级作用域寻找，父级也没有再一层一层向上寻找，直到找到全局作用域。

```js
var x = 10;
function fn() {
  // 在 fn 函数中，取自由变量 x 的值时,要到创建 fn 函数的作用域中取，无论 fn 函数将在哪里调用。
    console.log(x);
}
function show(f) {
    var x = 20(function() {
        f(); //10，而不是20
    })();
}
show(fn);
```

## 如何判断当前脚本运行在浏览器还是 node 环境

`typeof window === 'undefined' ? 'node' : 'browser';`通过判断当前环境的 window 对象类型是否为 undefined，如果是undefined，则说明当前脚本运行在node环境，否则说明运行在window环境。

## 节流与防抖

- 函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
- 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();
  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();
    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

## Object.is() 与原来的比较操作符 “===”、“==” 的区别

- 使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

```js
if (!Object.is) {
  Object.is = function(x, y) {
    if (x === y) {
      // +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // NaN == NaN
      return x !== x && y !== y;
    }
  };
}
```

## 0.1 + 0.2 != 0.3？

当计算机计算 0.1+0.2 的时候，实际上计算的是这两个数字在计算机里所存储的二进制，0.1 和 0.2 在转换为二进制表示的时候会出现位数无限循环的情况。js 中是以 64 位双精度格式来存储数字的，只有 53 位的有效数字，超过这个长度的位数会被截取掉这样就造成了精度丢失的问题。这是第一个会造成精度丢失的地方。在对两个以 64 位双精度格式的数据进行计算的时候，首先会进行对阶的处理，对阶指的是将阶码对齐，也就是将小数点的位置对齐后，再进行计算，一般是小阶向大阶对齐，因此小阶的数在对齐的过程中，有效数字会向右移动，移动后超过有效位数的位会被截取掉，这是第二个可能会出现精度丢失的地方。当两个数据阶码对齐后，进行相加运算后，得到的结果可能会超过 53 位有效数字，因此超过的位数也会被截取掉，这是可能发生精度丢失的第三个地方。

- 转换为整数后再进行运算，运算后再转换为对应的小数
- 将两个数相加的结果和右边相减和 Number.EPSILON 比较

## 实现 promise.all

```js
function PromiseAll(promises){
    return new Promise((resolve, reject)=>{
        if(!Array.isArray(promises)){
            throw new TypeError("promises must be an array")
        }
        let result = []
        let count = 0
        promises.forEach((promise, index) => {
            promise.then((res)=>{
                result[index] = res
                count++
                count === promises.length && resolve(result)
            }, (err)=>{
                reject(err)
            })
        })
    })
}
```
