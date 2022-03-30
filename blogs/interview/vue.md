---
title: Vue 面试知识点总结
date: 2021-01-01
tags:
 - interview
categories:
 - interview
---

## SPA 单页面的理解

SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

优点：

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
缺点：
- 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

## v-show 与 v-if 区别

- v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。
- v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

## 什么是 MVVM？比之 MVC 有什么区别？

- MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。
- MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。
- MVVM 模式中的 VM，指的是 ViewModel，它通过双向的数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新；ViewModel 变化了，View 也会更新。 vue 是通过使用数据劫持和发布订阅者模式来实现的这一功能。

## Vue 的单向数据流

- 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
- 每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。

## 直接给一个数组项赋值，Vue 能检测到变化吗？

- vue会监视data中所有层次的数据。
- 如何监测对象中的数据？
      通过setter实现监视，且要在new Vue时就传入要监测的数据。
        (1).对象中后追加的属性，Vue默认不做响应式处理
        (2).如需给后添加的属性做响应式，请使用如下API：
                Vue.set(target，propertyName/index，value) 或
                vm.$set(target，propertyName/index，value)
- 如何监测数组中的数据？
        通过包裹数组更新元素的方法实现，本质就是做了两件事：
          (1).调用原生对应的方法对数组进行更新。
          (2).重新解析模板，进而更新页面。
- 在Vue修改数组中的某个元素一定要用如下方法：
    1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    2.Vue.set() 或 vm.$set()
- 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！

## vue中的key有什么作用？（key的内部原理）

- 虚拟DOM中key的作用：
        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
- 对比规则：
      (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
            ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
            ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

      (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
            创建新的真实DOM，随后渲染到到页面。
- 用index作为key可能会引发的问题：
          1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                  会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
          2. 如果结构中还包含输入类的DOM：
                  会产生错误DOM更新 ==> 界面有问题。

## Vue 的生命周期是什么

Vue 的生命周期指的是组件从创建到销毁的一系列的过程，被称为 Vue 的生命周期。通过提供的 Vue 在生命周期各个阶段的钩子函数，可以很好的在 Vue 的各个生命阶段实现一些操作。

## Vue 的各个生命阶段

Vue 一共有8个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后，每个阶段对应了一个生命周期的钩子函数。

- beforeCreate 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在这个事件中获取不到 data 数据的。
- created 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般在这个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。
- beforeMount 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找到对应的 template，并编译成 render 函数。
- mounted 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中的 DOM 元素。
- beforeUpdate 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补丁之前，这个时候对可能会被移除的元素做一些操作，比如移除事件监听器。
- updated 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。
- beforeDestroy 钩子函数，在实例销毁之前调用。一般在这一步销毁定时器、解绑全局事件等。
- destroyed 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

- 当使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。
- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：
- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## Vue 双向数据绑定原理？

- vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用数据劫持和发布订阅者模式来实现的。
- 首先通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持，因此当 Model 中的数据发生变化的时候，可以通过配置的 setter 和 getter 方法来实现对 View 层数据更新的通知。
- 数据在 html 模板中一共有两种绑定情况，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。
- 如果遇到元素节点，并且属性值包含 v-model 的话，就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。
- 如果遇到了绑定的文本节点，使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，使用发布订阅者模式，属性作为一个主题，为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。

## 实现双向绑定MVVM

- 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
- 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
- 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
- mvvm入口函数，整合以上三者

<img src='./imgs/vue-1.png'>

- 实现Observer

```js
var data = {name: 'kindeng'};
observe(data);
data.name = 'dmq'; // 监听到值变化了 kindeng --> dmq
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}
```

## Vue 组件间的参数传递方式

### 父组件向子组件传值

<!-- 父 -->
```html
<children :msg="123"></children>
```
<!-- 子 -->
```js
<script>
export default {
  props: {
    msg: {
      type: String
    }
  }
};
</script>
```

### 子组件向父组件传值

<!-- 子 -->
```js
<script>
export default {
  data() {
    return {
      msg: "我是第二组件，我要给父组件传值",
    };
  },
  methods: {
    toParent() {
      this.$emit("toParent", this.msg);
    }
  }
};
</script>
```
<!-- 父 -->
```vue
<Child @toParent="getMag" />

  methods: {
    getMag(msg) {
      this.childMsg = msg;
    }
  }
```

### 父组件获取子组建属性和方法

<!-- 父 -->
```vue
<!-- ref的值是组件引用的名称 -->
<child-component ref="name"></child-component>
let child = this.$refs.name
child.属性
child.方法()
```

### 非父子组件 eventBus

- 定义一个新的vue实例

```js
//eventBus.js
import Vue from 'vue'
export default new Vue();
```

- 发送事件（发送数据）

```js
import bus from '@/bus';
// 方法内执行下面动作
bus.$emit('childa-message', this.data);
```

- 组件内监听（接收数据组件）

```js
import bus from '@/bus';
//方法内执行下面动作
bus.$on('childa-message', function(data) {
  console.log('I get it');
});
```

## computed和watch的区别

### computed 计算属性

- 计算属性基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的一个新值，这个新值只会根据已知值的变化而变化，简言之：这个属性依赖其他属性，由其他属性计算而来的。

computed 一个重要的特点，就是 computed 带有缓存功能,仅当初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；只有当 computed 属性被使用后，才会执行 computed 的代码，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果。

```js
data: {
    firstName: 'David',
    lastName: 'Beckham'
},
computed: {
  // 注：计算属性不能在 data 中定义
    fullName: function() { //方法的返回值作为属性值
            return this.firstName + ' ' + this.lastName
    }
}
```

- 计算属性的高级：在computed 中的属性都有一个 get 和一个 set 方法，当数据变化时，调用 set 方法。通过计算属性的 getter/setter 方法来实现对属性数据的显示和监视，即双向绑定

```js
computed: {
    fullName: {
        get() { //读取当前属性值的回调，根据相关的数据计算并返回当前属性的值
            return this.firstName + ' ' + this.lastName
        },
        set(val) { // 当属性值发生改变时回调，更新相关的属性数据，val就是fullName的最新属性值
            const names = val ? val.split(' ') : [];
            this.firstName = names[0]
            this.lastName = names[1]
        }
    }
}
```

### watch 监听属性

- 通过 vm 对象的 $watch() 或 watch 配置来监听 Vue 实例上的属性变化，或某些特定数据的变化，然后执行某些具体的业务逻辑操作。当属性变化时，回调函数自动调用，在函数内部进行计算。其可以监听的数据来源：data，props，computed 内的数据。
- 当需要在数据变化时执行异步或开销较大的操作时，watch方式是最有用的。 watch 是支持异步的。

```js
watch: {
    // 监听 data 中的 firstName，如果发生了变化，就把变化的值给 data 中的 fullName， val 就是 firstName 的最新值
    firstName: function(newVal,oldVal) {
        this.fullName = newVal + ' ' + this.lastName
    },
    lastName: function(val) {
        this.fullName = this.firstName + ' ' + val
    }，
    fullName: {
        handler(newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
        },
        deep: true // 开启深度监听
    }
}
```

### 区别

computed:

- 初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；
- 计算属性不在 data 中，它是基于data 或 props 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；
- 在 computed 属性对象中定义计算属性的方法，和取data对象里的数据属性一样，以属性访问的形式调用；
- 如果 computed 属性值是函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值；
- computed 属性值默认会缓存计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有依赖型数据发生改变，computed 才会重新计算；
- 在computed中的，属性都有一个 get 和一个 set 方法，当数据变化时，调用 set 方法。

watch:

- 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
- 可以监听的数据来源：data，props，computed内的数据；
- watch支持异步；
- 不支持缓存，监听的数据改变，直接会触发相应的操作；
- 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值。-
