---
title: Vue2
date: 2022-05-13
tags:
 - vue
categories:
 - vue
---

# 重学 Vue2

## 简介

- 动态构建用户界面的渐进式 JavaScript 框架
- 遵循 MVVM 模式
- 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
- 它本身只关注 UI, 也可以引入其它第三方库开发项目

### 特点

- 采用组件化模式，提高代码复用率，利于代码维护
- 声明式编码，无需直接操作 DOM, 提高开发效率
- 虚拟 DOM + Diff 算法，尽量复用 DOM 节点

## Vue 核心

### 引入

```js
<div id='root'>
    {{ name }}
</div>
// 引入后全局会多一个名为 Vue 的构造函数
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        // 指定当前 Vue 实例为哪个容器服务(容器和实例是一对一的关系)
        el: '#root',
        data: {
            name: 'aaa'
        }
    })
</script>
```

### 模板语法

#### 插值语法(标签体内容)

```html
<div id='root'>
     <!-- {{ js 表达式 }} -->
    {{ name }}
</div>
```

#### 指令语法(解析标签：标签属性，标签体内容，绑定事件)

```js
<div id='root'>
    <a v-bind:href="url" :title="title" />
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: {
            url: 'www.xxx'
        }
    })
</script>
```

### 数据绑定

```js
<div id='root'>
    // 单向绑定，数据又 data 流向页面
    <input v-bind:value="name"/>
    // 双向绑定，v-modal 只能用于表单类（输入类）元素上，v-modal:value == v-modal
    <input v-modal:value="name"/>
    <input v-modal="name"/>
</div>

<script>
    const vm = new Vue({
        el: '#root',
        data: {
            name: 'aaa'
        }
    })
</script>
```

### el 与 data  的两种写法

```js
const vm = new Vue({
    data(){
        // 此处 this 是 Vue 实例对象
        // 又 Vue 管理的函数不要写箭头函数，写了箭头函数， this 就不再指向 Vue 实例
        return {
            name: 'aaa'
        }
    }
})
vm.$mount('#root')
```

### MVVM 模型

- M：模型(Model) ：对应 data 中的数据
- V：视图(View) ：模板
- VM：视图模型(ViewModel) ： Vue 实例对象
- vm 身上所有的属性及 Vue 原型上所有属性，在 Vue 模板中都可以直接使用。

<img src="./images/vue2-1.jpg"/>

### 数据代理(通过一个对象代理对另一个对象中属性的操作（读/写）)

#### Object.defineProperty

```js
let number = 18
let person = {
    name:'张三',
    sex:'男',
}
Object.defineProperty(person,'age',{
    // value:18,
    // enumerable:true, //控制属性是否可以枚举，默认值是false
    // writable:true, //控制属性是否可以被修改，默认值是false
    // configurable:true //控制属性是否可以被删除，默认值是false
    //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
    get(){
        console.log('有人读取age属性了')
        return number
    },
    //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
    set(value){
        console.log('有人修改了age属性，且值是',value)
        number = value
    }
})
// console.log(Object.keys(person))  输出可枚举的 key
console.log(person)
```

#### Vue 中的数据代理

- data 中所有的属性，最后都出现在 vm 身上
- 通过 vw 读取数据是读取 data 中的数据，通过 vm 修改数据是修改 data 中的数据。
    - 通过Object.defineProperty()把data对象中所有属性添加到vm上。
    - 为每一个添加到vm上的属性，都指定一个getter/setter。
    - 在getter/setter内部去操作（读/写）data中对应的属性。

```js
const data = {
    name: 'aaa'
}
const vm = new Vue({
    el:'#root',
    data
})
// vm._data === data -> true
```

<img src="./images/vue2-2.jpg"/>

#### 事件处理

- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
- 事件的回调需要配置在methods对象中，最终会在vm上；
- methods中配置的函数，不要用箭头函数！否则this就不是vm了；
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
- @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；
- 事件修饰符
    - prevent：阻止默认事件（常用）；
    - stop：阻止事件冒泡（常用）；
    - once：事件只触发一次（常用）；
    - capture：使用事件的捕获模式(一般是在冒泡阶段处理事件)；
    - self：只有event.target是当前操作的元素时才触发事件；
    - passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
- 键盘事件 `<input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo">`

```html
<!-- <button v-on:click="showInfo">点我提示信息</button> -->
<button @click.stop="showInfo1">点我提示信息1（不传参）</button>
<button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
<script type="text/javascript">
    const vm = new Vue({
        methods:{
            showInfo1(event){
                // console.log(event.target.innerText)
                // console.log(this) //此处的this是vm
            },
            showInfo2(event,number){
                console.log(event,number)
                // console.log(event.target.innerText)
                // console.log(this) //此处的this是vm
            }
        }
    })
</script>
```

#### 计算属性

- 定义：要用的属性不存在，要通过已有属性计算得来。
- 原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
- get函数什么时候执行？
    - 初次读取时会执行一次。
    - 当依赖的数据发生改变时会被再次调用。
- 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
- 备注：
    - 计算属性最终会出现在vm上，直接读取使用即可。
    - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

```js
<div id="root">
    姓：<input type="text" v-model="firstName"> <br/><br/>
    名：<input type="text" v-model="lastName"> <br/><br/>
    全名：<span>{{fullName}}</span> <br/><br/>
</div>
<script type="text/javascript">
    const vm = new Vue({
        el:'#root',
        data:{
            firstName:'张',
            lastName:'三',
        },
        computed:{
            //完整写法
            /* fullName:{
                get(){
                    console.log('get被调用了')
                    return this.firstName + '-' + this.lastName
                },
                set(value){
                    console.log('set',value)
                    const arr = value.split('-')
                    this.firstName = arr[0]
                    this.lastName = arr[1]
                }
            } */
            //简写
            fullName(){
                console.log('get被调用了')
                return this.firstName + '-' + this.lastName
            }
        }
    })
</script>
```

#### 监视属性

- 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
- 监视的属性必须存在，才能进行监视,计算属性也可以被监视（不存在的属性都是 undefined ）
- 监视的两种写法：
    - new Vue时传入watch配置
    - 通过vm.$watch监视

```js
watch:{
    isHot:{
        immediate:true, // 初始化时让handler调用一下
        // handler什么时候调用？当isHot发生改变时。
        handler(newValue,oldValue){
            console.log('isHot被修改了',newValue,oldValue)
        }
    }
}

vm.$watch('isHot',{
    immediate:true, //初始化时让handler调用一下
    //handler什么时候调用？当isHot发生改变时。
    handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
    }
})
```

## API

### 全局配置

- Vue.config 包含 Vue 的全局配置（一次修改，全局使用）
- `Vue.config.productionTip = false`,设置为 false 以阻止 vue 在启动时生成生产提示。

### 全局 API
