title: Vue Router
date: 2022-04-01
tags:

- vue
categories:
- vue

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
