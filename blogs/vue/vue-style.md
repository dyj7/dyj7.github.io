---
title: Vue 风格指南
date: 2022-03-21
tags:
 - vue
categories:
 - vue
---

## 优先级 A 的规则：必要的 (规避错误)

### 组件名为多个单词

组件名应该始终是多个单词的，根组件 App 以及 <transition>、<component> 之类的 Vue 内置组件除外。（避免和现有的一级未来的 HTML 元素相冲突，因为所有 HTML 元素为单个单词）

```js
Vue.component('todo-item', {
  // ...
})

export default {
  name: 'TodoItem',
  // ...
}
```

### 组件的 data 必须是一个函数

当在组件中使用 data property 的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数。

```js
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})
```

### Prop 定义应该尽量详细

- 写明了组件的 API，所以很容易看懂组件的用法；
- 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助捕获潜在的错误来源。

```js
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
    // 这个值必须匹配下列字符串中的一个
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### 总是用 key 配合 v-for

### 永远不要把 v-if 和 v-for 同时用在同一个元素上(v-for 比 v-if 具有更高的优先级)

- 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。
- 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，将 v-if 移动至容器元素上 (比如 ul、ol)。
