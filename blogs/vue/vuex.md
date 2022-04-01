---
title: Vuex
date: 2022-04-01
tags:
 - vue
categories:
 - vue
---

- 为什么不能直接修改 store 中的数据， this.$store.state.count = 123
- Mutation 为什么不支持异步

## 状态管理模式

- 状态，驱动应用的数据源
- 视图，以声明方式将状态映射到视图
- 操作，响应在视图上的用户输入导致的状态变化

<image src='./images/vuex-1.png'>

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
