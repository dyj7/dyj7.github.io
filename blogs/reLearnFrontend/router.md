---
title: Vue Router
date: 2023-02-24
tags:
 - reLearnFrontend
categories:
 - reLearnFrontend
---

## Vue-Router 的懒加载

```js
// 非懒加载：
import List from '@/components/list.vue'
const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
// 箭头函数+import动态加载
const List = () => import('@/components/list.vue')
const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
// 把某个路由下的所有组件都打包在同一个异步块chunk中
const example1 = () => import(/* webpackChunkName: "Example" */ "@/views/example1.vue");
const example2 = () => import(/* webpackChunkName: "Example" */ "@/views/example2.vue");
// 组件懒加载
components:{
    "One-com": ()=>import("./one");
},
```

## 路由的hash和history

- hash模式是开发中默认的模式，它的URL带着一个#，例如：www.abc.com/#/vue，它的hash值就是#/vue。hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。所以改变hash值，不会重新加载页面。hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。

```js
window.onhashchange = function(event){
	console.log(event.oldURL, event.newURL);
	let hash = location.hash.slice(1);
}
```

- history模式的URL中没有#，用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。在刷新页面的时候，如果没有相应的路由或资源，就出现404。

```js
const router = new VueRouter({
  mode: 'history',// 切换为 history 模式
  routes: [...]
})
```

## 获取页面的hash变化

```js
// 监听 $route 的变化,当路由发生变化的时候执行
watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},
```

- window.location.hash读取#值 window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。

## $route 和 $router 的区别

- $route “路由信息对象”
    - $route.path: 返回字符串，对应当前路由的路径，总是解析为绝对路径。
    - $route.params: 返回一个key-value对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
    - $route.query: 返回一个key-value对象，表示URL查询参数。
    - $route.hash: 返回当前路由的带#的hash值，如果没有hash值，则为空字符串。
    - $route.meta: 返回当前的路由元信息。
    - $route.fullPath: 返回完成解析后的URL，包含查询参数和hash的完整路径。
    - $route.matched: 返回一个数组，包含当前路由的所有嵌套路径片段的路由记录，路由记录就是routes配置数组中的对象副本。
    - $route.name: 如果存在当前路由名称则返回当前路由的名称。
    - $route.redirectedFrom: 如果存在重定向，即为重定向来源的路由的名字。
- $router “路由实例”对象包括了路由的跳转方法，钩子函数等。
    - $router.beforeEach(to, from, next): 全局前置守卫，守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中状态，守卫方法接收三个参数: to: Route即将要进入的目标路由对象、from: Route: 当前导航正要离开的路由、next: Function: 调用该方法来resolve这个钩子，执行效果依赖next方法的调用参数，例如next()、next(false)、next('/')、next({path:'/',name:'home',replace:true,query:{q:1}})、next(error)等，通常在main.js中import的Vue Router实例中直接定义导航守卫，当然也可在Vue实例中访问$router来定义。
    - $router.afterEach(to, from): 全局后置钩子，进入路由之后调用，接收to、from两个参数。
    - $router.push(location[, onComplete[, onAbort]]): 编程式导航，使用$router.push方法导航到不同的URL，此方法会向history栈添加一个新的记录，当点击浏览器后退按钮时，则回到之前的URL。
    - $router.replace(location[, onComplete[, onAbort]]): 编程式导航，跟$router.push很像，唯一的不同就是，其不会向history添加新记录，而是跟它的方法名一样替换掉当前的history记录。
    - $router.go(n): 编程式导航，这个方法的参数是一个整数，意思是在history记录中向前或者后退多少步，类似window.history.go(n)。
    - $router.back(): 编程式导航，后退一步记录，等同于$router.go(-1)。
    - $router.onError(callback): 注册一个回调，该回调会在路由导航过程中出错时被调用，被调用的错误必须是下列情形中的一种，错误在一个路由守卫函数中被同步抛出、错误在一个路由守卫函数中通过调用next(err)的方式异步捕获并处理、渲染一个路由的过程中需要尝试解析一个异步组件时发生错误。

## params 和 query 参数

- params 方式(使用params方法，只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined。如果路由上面不写参数，也是可以传过去的，但不会在url上面显示参数，跳到别的页面或者刷新页面的时候参数会丢失)

```js
// /user/123
// 定义：
{
   path: '/user/:id',
   name: 'users',
   component: User,
},
// 跳转方法1：
<router-link :to="{ name: 'users', params: { id: 123 }}">按钮</router-link
// 跳转方法2：
this.$router.push({name:'users',params:{ id:123 }})
// 跳转方法3：
this.$router.push('/user/' + 123)
// 接收参数:
this.$route.params.id
```

- query方式

```js
// /user?id=123
// 传参:
this.$router.push({
        path:'/user',// 或者：name: 'users'
        query:{
          id:123
        }
      })

// 接收参数:
this.$route.query.id
```
