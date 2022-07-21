---
title: Vue 权限管理
date: 2022-07-21
tags:
 - frontend
categories:
 - frontend
---

- 前端权限归根结底是请求的发起权，请求的发起可能有下面两种形式触发
    - 页面加载触发
    - 页面上的按钮点击触发
- 前端权限控制可以分为四个方面：
    - 接口权限
    - 按钮权限
    - 菜单权限
    - 路由权限

### 接口权限

- 接口权限目前一般采用jwt的形式来验证，没有通过的话一般返回401，跳转到登录页面重新进行登录
- 登录完拿到token，将token存起来，通过axios请求拦截器进行拦截，每次请求的时候头部携带token

```js
axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
})
axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 40099 || response.data.code === 40098) { //token过期或者错误
        router.push('/login')
    }
})
```

### 路由权限控制

- 添加路由守卫

```js
router.beforeEach((to, from, next) => {
    if (getToken()) {next();return;}
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();return;
    }
    next('/login') // 否则全部重定向到登录页
})
```

### 菜单权限

#### 方案一

菜单与路由分离，菜单由后端返回
缺点：

- 菜单需要与路由做一一对应，前端添加了新功能，需要通过菜单管理功能添加新的菜单，如果菜单配置的不对会导致应用不能正常使用
- 全局路由守卫里，每次路由跳转都要做判断

### 按钮权限

#### 方案一

按钮权限可以用v-if判断,但是如果页面过多，每个页面页面都要获取用户权限role和路由表里的meta.btnPermissions，然后再做判断

### 方案二

自定义指令进行按钮权限的判断

- 配置路由

```js
{
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: {
        btnPermissions: ['admin', 'supper', 'normal']
    },
    //页面需要的权限
    children: [{
        path: 'supper',
        component: _import('system/supper'),
        name: '权限测试页',
        meta: {
            btnPermissions: ['admin', 'supper']
        } //页面需要的权限
    },
    {
        path: 'normal',
        component: _import('system/normal'),
        name: '权限测试页',
        meta: {
            btnPermissions: ['admin']
        } //页面需要的权限
    }]
}
```

- 自定义权限鉴定指令

```js
import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
    bind: function (el, binding, vnode) {
        // 获取页面按钮权限
        let btnPermissionsArr = [];
        if(binding.value){
            // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
            btnPermissionsArr = Array.of(binding.value);
        }else{
            // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
        }
        if (!Vue.prototype.$_has(btnPermissionsArr)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1) {
        isExist = true;
    }
    return isExist;
};
export {has}
```

- 按钮中引用v-has指令

`<a-button @click='editClick' type="primary" v-has>编辑</a-button>`
