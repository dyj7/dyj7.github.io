---
title: Vue Router
date: 2021-05-12
tags:
 - vue
categories:
 - vue
---

## 基本使用

- ```npm i vue-router```
- 应用插件：```Vue.use(VueRouter)```

```js
// router.js文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../components/About'
import Home from '../components/Home'
//创建并暴露一个路由器
export default new VueRouter({
 routes:[
  {
   path:'/about',
   component:About
  },
  {
   path:'/home',
   component:Home
  }
 ]
})
// main.js
import Vue from 'vue'
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//应用插件
Vue.use(VueRouter)
new Vue({
 el:'#app',
 render: h => h(App),
 router:router
})
```

- 路由使用(active-class可配置高亮样式)

```html
<!-- Vue中借助router-link标签实现路由的切换 -->
<div>
    <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
    <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
</div>
<!-- 指定组件的呈现位置 -->
<router-view></router-view>
```

- 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
- 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
- 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
- 整个应用只有一个router，可以通过组件的```$router```属性获取到。

## 嵌套路由（多级路由）

```js
<router-link to="/home/news">News</router-link>

routes:[
{
    path:'/about',
    component:About,
},
{
    path:'/home',
    component:Home,
    children:[ //通过children配置子级路由
        {
            path:'news', //此处一定不要写：/news
            component:News
        },
        {
            path:'message',//此处一定不要写：/message
            component:Message
        }
    ]
}
]
```

## 命名路由

```js
{
path:'/demo',
component:Demo,
children:[
    {
        path:'test',
        component:Test,
        children:[
            {
                name:'hello' //给路由命名
                path:'welcome',
                component:Hello,
            }
        ]
    }
]
}
```

```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link
:to="{
    name:'hello',
    query:{
        id: 666,
        title:'你好'
    }
}"
>跳转</router-link>
```

## 路由传参

### query 参数(不会影响 router 配置，会在 url 上显示)

1. 传递参数

```html
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link to="/home/message/detail?id=666&title=你好">跳转</router-link>
<router-link :to="`/home/message/detail?id=666&title=${title}`">跳转</router-link>

<!-- 跳转并携带query参数，to的对象写法 -->
<router-link
:to="{
    path:'/home/message/detail',
    query:{
        id: item.id,
        title: item.title'
    }
}"
>跳转</router-link>
```

- 接收参数：(url:xxxxx/home/message/detail?id=123&title=你好)

```js
$route.query.id
$route.query.title
```

### params参数

- 配置路由，声明接收params参数

   ```js
   {
    path:'/home',
    component:Home,
    children:[
     {
      path:'news',
      component:News
     },
     {
      component:Message,
      children:[
       {
        name:'xiangqing',
        path:'detail/:id/:title', //使用占位符声明接收params参数
        component:Detail
       }
      ]
     }
    ]
   }
   ```

- 传递参数

> 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="`/home/message/detail/${id}/${title}`">跳转</router-link>

<!-- 跳转并携带params参数，to的对象写法 -->
<router-link
:to="{
    name:'xiangqing',
    params:{
        id:666,
        title:'你好'
    }
}"
>跳转</router-link>
```

- 接收参数：(url:xxxxx/home/message/detail/666/你好)

```js
$route.params.id
$route.params.title
```

## 路由的 props 配置

```js
{
 name:'xiangqing',
 path:'detail/:id',
 component:Detail,

 //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
 props:{a:900}

 //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
 props:true
 
 //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
 props($route){
  return {
   id:$route.query.id,
   title:$route.query.title
  }
 }
}
// Detail
export default{
  props:['id','title'],
}
```

### `<router-link>`的replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式
- 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为```push```
- 如何开启`replace`模式：`<router-link replace to='xx'>News</router-link>`

## 编程式路由导航

   ```js
   //$router的两个API
   this.$router.push({
    name:'xiangqing',
     params:{
      id:xxx,
      title:xxx
     }
   })
   
   this.$router.replace({
    name:'xiangqing',
     params:{
      id:xxx,
      title:xxx
     }
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go(n) //前进/后退n
   ```

## 缓存路由组件

- 让不展示的路由组件保持挂载，不被销毁。

```html
<!-- 不写include默认会缓存所有组件，:include="['a','b']"，include内写的是组件的name -->
<keep-alive include="News"> 
 <router-view></router-view>
</keep-alive>
```

### 两个新的生命周期钩子

- keep-alive 缓存的组件所独有的两个钩子，用于捕获路由组件的激活状态。

```js
activated(){
    console.log('组件激活')
},
deactivated(){
   console.log('组件失活')
}
```

## 路由守卫（对路由进行权限控制）

### 全局路由守卫

 ```js
 const router =  new VueRouter({
     routes:[
        {
           path:'/set',
           component:Set,
           meta:{isAuth:true,title:'设置'} // meta 里防止路由元信息
        },
        {
            name:'zhuye',
            path:'/home',
            component:Home,
            meta:{title:'主页'},
        }
     ]
 })
 //全局前置守卫：初始化时执行、每次路由切换前执行
 router.beforeEach((to,from,next)=>{
  console.log('beforeEach',to,from)
  if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   if(localStorage.getItem('role') === 'admin'){ //权限控制的具体规则
    next() //放行
   }else{
    alert('暂无权限查看')
    // next({name:'guanyu'})
   }
  }else{
   next() //放行
  }
 })
 
 //全局后置守卫：初始化时执行、每次路由切换后执行
 router.afterEach((to,from)=>{
  console.log('afterEach',to,from)
  if(to.meta.title){ 
   document.title = to.meta.title //修改网页的title
  }else{
   document.title = 'vue_test'
  }
 })
 export default router
 ```

### 独享路由守卫

```js
{
 path:'/home',
 component:Home,
 meta:{title:'主页'},
 children:[
  {
   path:'news',
   component:News,
   meta:{isAuth:true,title:'新闻'},
   beforeEnter: (to, from, next) => {
    console.log('独享路由守卫',to,from)
    if(to.meta.isAuth){ //判断是否需要鉴权
     if(localStorage.getItem('role')==='admin'){
      next()
     }else{
      alert('无权限查看！')
     }
    }else{
     next()
    }
   }
  },
 ]
}
```

### 组件内守卫

```js
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

## 路由器的两种工作模式（默认 hash）

- 对于一个url来说，#及其后面的内容就是hash值。
- hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
- hash模式：
  - 地址中永远带着#号，不美观 。
  - 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
  - 兼容性较好。
  - 核心通过监听url中的hash来进行路由跳转。
  
    ```js
    // 定义 Router  
    class Router {  
      constructor () {  
          this.routes = {}; // 存放路由path及callback  
          this.currentUrl = '';  

          // 监听路由change调用相对应的路由回调  
          window.addEventListener('load', this.refresh, false);  
          window.addEventListener('hashchange', this.refresh, false);  
      }  
      route(path, callback){  
          this.routes[path] = callback;  
      }  
      push(path) {  
          this.routes[path] && this.routes[path]()  
        }
  }  
  // 使用 router  
  window.miniRouter = new Router();  
  miniRouter.route('/', () => console.log('page1'))  
  miniRouter.route('/page2', () => console.log('page2'))  

  miniRouter.push('/') // page1  
  miniRouter.push('/page2') // page2  
  ```

- history模式：
  - 地址干净，美观 。
  - 兼容性和hash模式相比略差。
  - 解决刷新页面会直接发网络请求，应用部署需要后端人员支持，解决刷新页面服务端404的问题。
  - history 模式核心借用 HTML5 history api

  ```js
    // 定义 Router  
  class Router {  
      constructor () {  
          this.routes = {};  
          this.listerPopState()  
      }  
      init(path) {  
          history.replaceState({path: path}, null, path);  
          this.routes[path] && this.routes[path]();  
      }  
      route(path, callback){  
          this.routes[path] = callback;  
      }  
      push(path) {  
          history.pushState({path: path}, null, path);  
          this.routes[path] && this.routes[path]();  
      }  
      listerPopState () {  
          window.addEventListener('popstate' , e => {  
              const path = e.state && e.state.path;  
              this.routers[path] && this.routers[path]()  
          })  
      }  
  }  
  // 使用 Router  
  window.miniRouter = new Router();  
  miniRouter.route('/', ()=> console.log('page1'))  
  miniRouter.route('/page2', ()=> console.log('page2'))  
  // 跳转  
  miniRouter.push('/page2')  // page2  
  ```

- 更换路由模式

```js
 const router =  new VueRouter({
     mode: 'hsitory', // 默认为 hash
     routes:[
        {
           path:'/set',
           component:Set,
           meta:{isAuth:true,title:'设置'} // meta 里防止路由元信息
        },
     ]
 })
```
