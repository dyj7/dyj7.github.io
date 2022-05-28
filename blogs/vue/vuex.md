---
title: VueX
date: 2022-04-01
tags:
 - vue
categories:
 - vue
---

## 概念

​在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

## 状态管理模式

- 状态，驱动应用的数据源
- 视图，以声明方式将状态映射到视图
- 操作，响应在视图上的用户输入导致的状态变化

<img src='./images/vuex-1.png'>

## 基本使用

```js
// 安装
npm install vuex --save
// 引入
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建 store 对象
const store = new Vuex.Store({
    // state 存放的就是全局共享的数据
    state: { count: 0 }
})
// 将 store 挂载到 vue 实例中
new Vue({
    el: '#app'
    render: h => h(app),
    router,
    store
})
```

1. 创建文件：```src/store/index.js```

  ```js
  //引入Vue核心库
  import Vue from 'vue'
  //引入Vuex
  import Vuex from 'vuex'
  //应用Vuex插件
  Vue.use(Vuex)

  //actions对象——响应组件中用户的动作
  const actions = {}
  //mutations对象——修改state中的数据
  const mutations = {}
  //state对象——保存具体的数据
  const state = {}

  //创建并暴露store
  export default new Vuex.Store({
  actions,
  mutations,
  state
  })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......

   //创建vm
   new Vue({
    el:'#app',
    render: h => h(App),
    store
   })
   ```

## 核心概念

### State

- State 是唯一的公共数据源，所有共享的数据都要统一放到 store 的 State 中进行存储。

```js
const store = new Vuex.Store({
    // state 存放的就是全局共享的数据
    state: { count: 0 }
})
// 组件访问 State 中数据的第一种方式
this.$store.state.count
// 组件访问 State 中数据的第二种方式
// 1. 从 vuex 中按需引入 mapState 函数
import { mapState } from 'vuex'
// 2. 将当前组件需要的全局数据映射到当前组件的 computed 计算属性
computed: {
    ...mapState(['count'])
}
```

### Mutation

- 使用 Mutation 变更 Store 中的数据(不可定义异步操作)

```js
// 定义
mutations: {
    add(state, step){
        state.count += step;
    }
}
// 组件中使用 mutations 的第一种方式
this.$store.commit('add', step)
// 组件中使用 mutations 的第二种方式
// 1. 从 vuex 中按需引入 mapMutations 函数
import { mapMutations } from 'vuex'
// 2. 将当前组件需要的 mutations 映射到当前组件的 methods 中
methods: {
    ...mapMutations(['add'])
}
```

### Action

- 可定义异步操作，通过触发 Mutations(context.commit('')) 的方式间接变更数据

```js
// 定义
  actions: {
    addAsync (context, step) {
      setTimeout(() => {
        context.commit('add', step)
      }, 1000)
    }
  },
// 组件中使用 Action 的第一种方式
this.$store.dispatch('addAsync', step)
// 组件中使用 Action 的第二种方式
// 1. 从 vuex 中按需引入 mapActions 函数
import { mapActions } from 'vuex'
// 2. 将当前组件需要的 Action 映射到当前组件的 methods 中
methods: {
    ...mapActions(['addAsync'])
}
```

### Getter

- Getter 用于对 Store 中的数据进行加工处理，不会修改 Store 中的数据，Getter 中定义的数据会随 Store 中数据的变化二变化

```js
// 定义
getters: {
    shownCount: state => {
      return `current count is ${state.count} `
    }
  },
// 组件访问 getters 中数据的第一种方式
this.$store.getters.shownCount
// 组件访问 getters 中数据的第二种方式
// 1. 从 vuex 中按需引入 mapGetters 函数
import { mapGetters } from 'vuex'
// 2. 将当前组件需要的全局数据映射到当前组件的 computed 计算属性
computed: {
    ...mapGetters(['shownCount'])
}
```

- 为什么不能直接修改 store 中的数据， this.$store.state.count = 123
- Mutation 为什么不支持异步
