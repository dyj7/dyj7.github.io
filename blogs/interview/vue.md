---
title: Vue 面试知识点总结
date: 2021-01-01
tags:
 - interview
categories:
 - interview
---

## 什么是 MVVM？比之 MVC 有什么区别？

- MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。
- MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。
- MVVM 模式中的 VM，指的是 ViewModel，它通过双向的数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新；ViewModel 变化了，View 也会更新。 vue 是通过使用数据劫持和发布订阅者模式来实现的这一功能。

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

当使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

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
