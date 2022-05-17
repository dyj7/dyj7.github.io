---
title: Vue3
date: 2022-05-13
tags:
 - vue
categories:
 - vue
---

## vite

- 开发环境无需打包，可快速冷启动
- 按需编译
- 轻量热重载

## 分析工程结构

- vue3 中的模板结构可以没有跟标签
- main.js

```js
//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
//挂载
app.mount('#app')
```

## setup (新的配置项，值为函数)

- 数据，方法等均需要配置在 setup 中
- 若返回一个对象，则对象中的属性、方法可以直接在模板中使用
- setup 不能是一个 async 函数

## ref,定义响应式数据

- js 中操作数据 : xxx.value
- 模板中读取数据不需要 .value, 直接 {{ xxx }}
- 可传入基本类型和对象类型，基本数据类型依然依靠 `Object.defineProperty` 的 `getter/setter`，对象数据类型需要 `reactive`

``` js
import { ref } from 'vue'
export default {
    setup(){
        let name = ref('张三');     // name 为引用对象（RefImpl） get/set
        let job = ref({             // job 为 RefImpl， type\salary 为 Proxy
            type:'前端工程师',
            salary:'30K'
        })
        changeInfo(){
            name.value = '李四'
            job.value.salary = '60k'
        }
        return {
            name,
            changeName,
        }
    }
}
```

## reactive,定义对象类型的响应式数据

- `const 代理对象 = reactive(源对象)`,接受对象（或数组），返回代理对象(Proxy 对象)

```js
import { reactive } from 'vue'
let job = reactive({
    type:'aaa',
    salary:'30'
})
let hobby = reactive(['aaa','bbb','ccc'])
changeInfo(){
    job.salary = '60'
    hobby[0] = 'AAA'
}
```

## 响应式原理

### Vue2.x

- 对象类型，通过 `Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）
- 数组类型，通过重写数组的一系列方法来实现的，(1.正常调用数组方法，2.更新界面)

存在问题：

- 新增、删除属性，界面不会更新,解决新增 `this.$set({ this.obj, 'name', 'aaa'})`，解决删除 `this.$delete({ this.obj, 'age' })` 或 Vue.set/Vue.delete
- 通过下标修改数组元素，界面不会更新 `this.$set({ this.arr, 0, 'newVal'})` 或者 `this.arr.splice(0,1,'newVal')`

### Vue3.x

#### Proxy

- 通过 Proxy(代理): 拦截对象中任意属性的变化，包括读写、添加、删除
- 通过 Reflect(映射): 对源对象的属性进行操作

```js
// Reflect(反射) 操作会返回 true/false (减少代码的 try/catch)
let person = {
  name:'张三',
  age:18
}
const p = new Proxy(person,{
  //读取p的某个属性时调用
  get(target,propName){
    console.log(`有人读取了p身上的${propName}属性`)
    return Reflect.get(target,propName)
  },
  //修改p的某个属性、或给p新增属性时调用
  set(target,propName,value){
    console.log(`有人修改了p身上的${propName}属性，Vue 去更新界面`)
    Reflect.set(target,propName,value)
  },
  //删除p的某个属性时调用
  deleteProperty(target,propName){
    console.log(`有人删除了p身上的${propName}属性，Vue 去更新界面了`)
    return Reflect.deleteProperty(target,propName)
  }
})
```

#### reactive 和 ref 对比

- ref 用来定义基本数据类型数据， reactive 用来定义对象（数组）类型数据。（ref 也可用来定义对象、数组类型数据，会自动通过`reactive`转为代理对象）
- ref 通过 `Object.definedProperty()` 的 `get` 与 `set` 来实现响应式（数据劫持）。 reactive 通过使用 Proxy 来实现响应式（数据劫持）,通过 Reflect 操作源对象
- ref 操作数据需要 .value，模板中不需要， reactive 均不需要

### setup 注意点

- setup 在 beforeCreate 之前执行，this 是 undefined
- setup 接受两个参数
    - props: Proxy 对象，包含组件外部传递过来且组件内部声明接受了的属性
    - context: 上下文对象
        - attrs: 包含组件外部传递过来，但没有在 props 配置声明的属性，相当于 `this.$attrs`
        - slots: 收到的插槽内容，相当于 `this.$slots`
        - emit：分发自定义事件的函数，相当于 `this.$emit`

```js
<Demo @hello='onChildClick' msg='123' name='aaa' age='18'>
  <template v-slot:slot-1> // slot="slot-1"
    <span>123</span>
  </template>
</Demo>

// Demo component


props: ['msg', 'name'],
emits: ['hello'], // 父级绑定的事件
setup: (props, context){
// context.attrs 子级未在 props 中接受的父级传递的参数,此处为 age
// context.emit('hello', params)  触发自定义事件
// context.slots,使用 v-slot 会拿到正常命名的插槽，其余方式（包括 slot="xx")均为default
}
```

## computed

```js
import { computed } from 'vue'
export default {
  setup(){
    const person = {
      firstName: '张',
      lastName: '三'
    }
    // 未考虑计算属性被修改的情况
    person.fullName = computed(()=>{
      return person.firstName + '-' + person.lastName
    })
    // 考虑读写
    person.fullName = computed({
      get(){
        return person.firstName + person.lastName
      },
      set(value){
        const nameArr = value.split('-');
        person.firstName = nameArr[0];
        person.lastName = nameArr[1];
      }
    })
    return {
      person
    }
  }
}
```

## watch

- 监视 rective 定义的响应式数据： oldVal 无法争取获取，强制开启 deeP:true,(deep配置无效)
- 监视 reactive 定义的响应式数据的某个（对象）属性时，deep 有效

```js
import { watch } from 'vue'
export default {
  setup(){
    let sum = ref(0);
    let name = ref('张三');
    let person = reactive({
      name: '张三',
      age: 18,
      job:{
        comp:'aaa'
      }
    })
    // 监视一个
    watch(sum,(newVal, oldVal) => {
      // sum 改变了
    })
    // 监视多个
    watch([sum, name], (newVal, oldVal) => {
      // oldVal => [0, '张三']
    }, { immediate: true })
    // 监视 reactive 对象, 1、无法正确获取 oldVal, oldVal 和 newVal 一样
    //                    2、强制开启了 deep: true, deep配置无效
    watch(person, (newVal, oldVal) => {}, { deep:false })
    // 监视某个对象属性
    watch(()=>person.age, (newVal, oldVal) => { })
    // 监视多个对象属性
    watch([()=>person.age, ()=>person.name], (newVal, oldVal) => { })
    // 监视对象的对象属性
    watch(()=>person.job, (newVal, oldVal) => { },{deep:true}) //此处需开启deep
    // 监视 ref 创建的对象
    let obj = ref({a:1,b:2})
    watch(obj.value,(newVal,oldVal)=>{})
    watch(obj,(newVal,oldVal)=>{},{deep:true})

    return {
      sum,
    }
  })
}
```

## watchEffect

- 不用指明监视哪个属性，在监视回调中用到哪个属性就会监视哪个属性
- 有点类似于 computed
    - computed 注重计算出来的值，所以需要返回值
    - watchEffect更注重结果，所以不用写返回值

```js
import { watchEffect } from 'vue'
export default {
  setup(){
    // 初始化会掉一次（类似默认开启 immediate
    watchEffect(()=>{
      const s = sum.value;
      const s2 = person.job.comp; // 当 person.job.comp 改变时才触发，其他属性改变不触发
    })
  }
}
```

## 生命周期

```js
	import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
	export default {
		name: 'Demo',

		setup(){
			console.log('---setup---')
			//数据
			let sum = ref(0)

			//通过组合式API的形式去使用生命周期钩子(同名组合式 api 在配置项之前)
			onBeforeMount(()=>{
				console.log('---onBeforeMount---')
			})
			onMounted(()=>{
				console.log('---onMounted---')
			})
			onBeforeUpdate(()=>{
				console.log('---onBeforeUpdate---')
			})
			onUpdated(()=>{
				console.log('---onUpdated---')
			})
			onBeforeUnmount(()=>{
				console.log('---onBeforeUnmount---')
			})
			onUnmounted(()=>{
				console.log('---onUnmounted---')
			})

			//返回一个对象（常用）
			return {sum}
		},
		//通过配置项的形式使用生命周期钩子
		beforeCreate() {
			console.log('---beforeCreate---')
		},
		created() {
			console.log('---created---')
		},
		beforeMount() {
			console.log('---beforeMount---')
		},
		mounted() {
			console.log('---mounted---')
		},
		beforeUpdate(){
			console.log('---beforeUpdate---')
		},
		updated() {
			console.log('---updated---')
		},
		beforeUnmount() {
			console.log('---beforeUnmount---')
		},
		unmounted() {
			console.log('---unmounted---')
		},
	}
```

## toRef、toRefs

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```...toRefs(person)```
