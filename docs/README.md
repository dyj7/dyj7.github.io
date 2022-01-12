---
title: React
date: 2021-12-29
tags:
 - React
 - Docs
---

```js
一、入门
1.创建虚拟DOM的两种方式
(1) jsx : const VDOM = <div id='wrap'>hello</div> (需引入balbel <script type="text/babel">)
(2) react : const VDOM = React.creactElement('div',{id:'wrap'},'hello')
jsx解决原生创建虚拟DOM太繁琐
const VDOM = (
    <div>
        	<span>hello</span>
    </div>
)
babel会将1方式翻译成2方式，1为2的语法糖
ReactDOM.render(VDOM,doucment.getElementById('id')) //渲染
typeof VDOM -- object    虚拟DOM就是一个一般的js对象
VDOM对象的属性比较少，VDOM是React内部在用，无需真实DOM那么多属性
VDOM最终会被React转换为真实DOM呈现在页面上

2.jsx语法规则
 (1)定义虚拟DOM时不要写引号
 (2)标签中混入js表达式时用{}
 (3)样式的类名指定要用className
 (4)内联样式格式 style={{key:value}} 的形式
 (5)根标签只能有一个
 (6)标签必须闭合
 (7)标签首字母
     小写字母开头，将标签转换为html中同名元素，若html无同名标签，报错
     大写字母开头，react就去渲染对应的组件，若组件未定义，则报错

二、react组件
1.函数式组件
        //1.创建函数式组件
        function MyComponent(){
            console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式，严格模式会禁止this指向window
            return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
        }
        //2.渲染组件到页面
        ReactDOM.render(<MyComponent/>,document.getElementById('test'))
                    1.React解析组件标签，找到了MyComponent组件。
                    2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
2.类式组件 //必须继承React.Component类，必须要有render
        //1.创建类式组件
        class MyComponent extends React.Component {
            render(){
                //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
                //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
                console.log('render中的this:',this);
                return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
            }
        }
        //2.渲染组件到页面
        ReactDOM.render(<MyComponent/>,document.getElementById('test'))
                    1.React解析组件标签，找到了MyComponent组件。
                    2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
                    3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
三、组件（实例-类式组件）三大核心属性(state,props,refs)
1.状态state（组件的状态里存放数据，数据的改变驱动页面的展示）
有状态的组件时复杂组件，无状态的组件是简单组件
        //1.创建组件
        class Weather extends React.Component{
            //初始化状态，类中可以直接写赋值语句，相当于在构造函数中this.state={...}
            state = {isHot:false,wind:'微风'}
            render(){
                const {isHot,wind} = this.state
                return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
            }
            //自定义方法————要用赋值语句的形式+箭头函数
            changeWeather = ()=>{
                const isHot = this.state.isHot
                this.setState({isHot:!isHot})
            }
        }
        //2.渲染组件到页面
        ReactDOM.render(<Weather/>,document.getElementById('test'))
2.props 每个组件对象都会有props(properties的简写)属性,组件标签的所有属性都保存在props中
    (<script type="text/javascript" src="../js/prop-types.js"></script>)
    作用:通过标签属性从组件外向组件内传递变化的数据。注意: 组件内部不要修改props数据
    (标签体内容是特殊的props:this.props.children,闭合标签设置childdren属性，内容体为children属性的值)
  //创建组件
        class Person extends React.Component{
            constructor(props){
                //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
                super(props)
                console.log('constructor',this.props);
            }
            //对标签属性进行类型、必要性的限制
            static propTypes = {
                name:PropTypes.string.isRequired, //限制name必传，且为字符串
                sex:PropTypes.string,//限制sex为字符串
                age:PropTypes.number,//限制age为数值
            }
            //指定默认标签属性值
            static defaultProps = {
                sex:'男',//sex默认值为男
                age:18 //age默认值为18
            }
            render(){
                const {name,age,sex} = this.props
                //props是只读的
                //this.props.name = 'jack' //此行代码会报错，因为props是只读的
                return (
                    <ul>
                        <li>姓名：{name}</li>
                        <li>性别：{sex}</li>
                        <li>年龄：{age+1}</li>
                    </ul>
                )
            }
        }
        //渲染组件到页面
        ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
 3.refs 组件内的标签可以定义ref属性来标识自己
        1.字符串形式的ref  <input ref="input1"/>     不推荐使用，效率低
        2. 回调形式的ref   <input ref={(c)=>{this.input1 = c}}
        内联写回调函数，state发生改变的时候会调用两次 第一次为Null(清空作用)第二次为该节点
        避免：<input ref={this.saveInput} type="text"/>    saveInput = (c)=>{this.input1 = c;}
        3. createRef创建ref容器·       myRef = React.createRef()  <input ref={this.myRef}/>     使用:this.myRef.current
        React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
4.事件处理
        通过onXxx属性指定事件处理函数(注意大小写)
            1)React使用的是自定义(合成)事件, 而不是使用的原生DOM事件（更好的兼容性）
            2)React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) （高效）
        通过event.target得到发生事件的DOM元素对象 （不要过度使用ref）
5.受控组件、非受控组件
     非受控组件:现用现取  <input ref={c => this.username = c}>
     受控组件:页面中输入类的DOM，随着输入，会把输入的内容(onChange)维护到(setState)state里面，用的时候从状态里取（双向数据绑定）
     推荐使用 受控组件，受控组件不使用ref

     高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
     1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
     2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
     常见的高阶函数有：Promise、setTimeout、arr.map()等等

 函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。
 function sum(a){
 return(b)=>{
 return (c)=>{
 return a+b+c;}}}
 sum(1)(2)(3)
 纯函数：只要是同样的输入(实参)，必定得到同样的输出(返回)
 1)     不得改写参数数据
2)     不会产生任何副作用，例如网络请求，输入和输出设备
3)     不能调用Date.now()或者Math.random()等不纯的方法  

四、组件生命周期
挂载：mount 卸载：unmount
（旧版本）
挂载时：由ReactDOM.render()触发---初次渲染
1.constructor(){}
2.//即将挂载
componentWillMount()
3.//初始化渲染、状态更新之后
render(){}
4.//组件挂完毕（开启定时器、发送网络请求、订阅消息）
componentDidMount(){}

//组件将要卸载（关闭定时器、取消订阅消息）
componentWillUnmount(){}
//卸载组件
ReactDOM.unmountComponentAtNode(document.getElementById('test'))

更新阶段：由组件内部this.setSate()或父组件render触发
1.  shouldComponentUpdate(){必须返回true下面的钩子才会执行}
2.  componentWillUpdate()
3.  render() =====> 必须使用的一个
4.  componentDidUpdate()

强制更新：不对状态改修就进行更新
this.forceUpdate()
1.  componentWillUpdate()
2.  render() =====> 必须使用的一个
3.  componentDidUpdate()

父组件render
1.  componentWillReceiveProps()//组件将要接收新的props的钩子,第一次不算
2.  shouldComponentUpdate(){必须返回true下面的钩子才会执行}
3.  componentWillUpdate()
4.  render() =====> 必须使用的一个
5.  componentDidUpdate()
（新版本）
即将废弃：现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用
componentWillMount
componentWillReceiveProps
componentWillUpdate
新增:
(1)state 的值在任何时候都取决于 props : static getDerivedStateFromProps(props, state){}  //必须返回object或Null
(2)     getSnapshotBeforeUpdate(){
                return this.refs.list.scrollHeight
            }

            componentDidUpdate(preProps,preState,height){
                this.refs.list.scrollTop += this.refs.list.scrollHeight - height
            }

                1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
                                1.  constructor()
                                2.  getDerivedStateFromProps 
                                3.  render()
                                4.  componentDidMount() =====> 常用
                                            一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
                2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
                                1.  getDerivedStateFromProps
                                2.  shouldComponentUpdate()
                                3.  render()
                                4.  getSnapshotBeforeUpdate
                                5.  componentDidUpdate()

五、Diffing算法
遍历的最小粒度是标签
      1). react/vue中的key有什么作用？（key的内部原理是什么？）
      2). 为什么遍历列表时，key最好不要用index?
            1. 虚拟DOM中key的作用：
                 1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。
                 2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 
                                随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
                                   a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
                                     (1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
                                    (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
                                   b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
                                             根据数据创建新的真实DOM，随后渲染到到页面
                                    
            2. 用index作为key可能会引发的问题：
                 1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                                                会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
                 2. 如果结构中还包含输入类的DOM：
                                                会产生错误DOM更新 ==> 界面有问题。
                                                
                 3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
                                    仅用于渲染列表用于展示，使用index作为key是没有问题的。                    
            3. 开发中如何选择key?:
                   1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
                   2.如果确定只是简单的展示数据，用index也是可以的。
六、React应用
	public ---- 静态资源文件夹
 	src ---- 源码文件夹

        <!-- %PUBLIC_URL%代表public文件夹的路径 -->
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <!-- 开启理想视口，用于做移动端网页的适配 -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
父组件传值给子组件：(状态在哪，操作状态的方法就要在哪)
父：<Child data={data}/> 子：this.props.data
子组件传值给父组件：（需要父通过props传递给子一个函数）
父:<Child getData={this.getData}>   getData=(data)=>{...}
子：sendData = (data)=>{this.props.getData(data)}
兄弟之间传值：消息订阅-发布机制（PubSubJS）
B --> A
A订阅消息，B发布消息
A:    componentDidMount(){
        this.token = PubSub.subscribe('TOKEN',(msg,stateObj)=>{
            this.setState(stateObj)
        })
    }
      componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }
B:sendData = ()=>{
    PubSub.publish('TOKEN',data)
}
七、axios
    axios.get('http://localhost:5000/students').then(
      response => { console.log(response.data) },
      error => { }
    )
    会出现跨域问题，ajax引擎会允许跨域发请求，但会拦截返回的数据，使用proxy代理（开在发出请求端口），
    中间人使用请求转发的形式，没有ajax引擎
 配置代理
 1.在package.json中只能配置一个后端接口
    在package.json中: "proxy":"http://localhost:5000"（写到端口即可）
    axios.get('http://localhost:3000/students').then(...)（自身没有再去5000找 ）
优点：配置简单，前端请求资源时可以不加任何前缀。
缺点：不能配置多个代理。
工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）
2.创建代理配置文件
在src下创建配置文件：src/setupProxy.js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
   request.get('Host')
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''}
    })
  )
}
优点：可以配置多个代理，可以灵活的控制请求是否走代理。
缺点：配置繁琐，前端请求资源时必须加前缀。

jsonp的原理就是借助HTML中的<script>标签可以跨域引入资源。所以动态创建一个<srcipt>标签，
src为目的接口 + get数据包 + 处理数据的函数名。
后台收到GET请求后解析并返回函数名(数据)给前端，前端<script>标签动态执行处理函数
八、React路由
import { NavLink,Link, Router, BrowserRouter, Route，Switch,Redirect, withRouter } from 'react-router-dom'
前端路由：hash模式和history模式
hash兼容IE8以上，history兼容IE10以上
hash模式带#
pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；
而hash设置的新值必须与原来不一样才会触发记录添加到栈中

路由的原理就是对浏览器的histoty进行操作 push\replace,默认为push,
开启replace模式<Link replace={true}>，不会留下痕迹

一个路由就是一个映射关系(key:value)
    key为路径, value可能是function或component
路由分类
    1.后端路由：
    理解： value是function, 用来处理客户端提交的请求。
    注册路由： router.get(path, function(req, res))
    工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
    2.前端路由：
    浏览器端路由，value是component，用于展示页面内容。
    注册路由: <Route path="/test" component={Test}>
    工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

 路由组件、一般组件:
            1.写法不同：
                        一般组件：<Demo/>
                        路由组件：<Link to="/demo">Demo</Link>  <Route path="/demo" component={Demo}/>
            2.存放位置不同：
                        一般组件：components
                        路由组件：pages
            3.接收到的props不同：
                        一般组件：写组件标签时传递了什么，就能收到什么
                        路由组件：接收到三个固定的属性
                                            history:
                                                        go: ƒ go(n)
                                                        goBack: ƒ goBack()
                                                        goForward: ƒ goForward()
                                                        push: ƒ push(path, state)
                                                        replace: ƒ replace(path, state)
                                            location:
                                                        pathname: "/about"
                                                        search: ""
                                                        state: undefined
                                            match:
                                                        params: {}
                                                        path: "/about"
                                                        url: "/about"

选中高亮：默认会类名为active: <NavLink activeClassName="active" to="/header">Header</NavLink>

若一个路径对应多个路由，那么会匹配所有路由，全部显示，会有效率问题，引入Switch组件，第一个匹配后就不再匹配

路由路径是多级结构可能会存在刷新样式丢失问题：（<link rel="stylesheet" href="./style.css">）
1.<link rel="stylesheet" href="/style.css">
2.<link rel="stylesheet" href="%PUBLIC_URL%/style.css">
3.使用HashRouter

默认为模糊匹：'/demo/a/b' 可以匹配'/demo'
开启精准匹配：
<Link to="/demo">Demo</Link>  <Route exact={true}} path="/demo" component={Demo}/>

默认路由(重定向):Redirect   <Redirect to='/demo'>都不匹配时指向demo
嵌套路由，路由的匹配顺序按照注册的顺序
路由组件传参：
1.params参数：
向路由组件传params参数: <link to=`/demo/home/${id}/${name}`>
声明接受params参数 <Route path="/demo/home/:id/:name">
接收参数(Home): this.props.match.params.id
2.search参数   （urlencoded编码：key=value&key1=value1）
import qs from 'querystring'
let obj={name:'aaa',age:18}  qs.stringify(obj) ==> name=aaa&age=18
let str='name=aaa&age=18'     qs.parse(str)    ==> {name:'aaa',age:18}

向组件传search参数:<link to=`/demo/home/?id=${id}&name=${name}`>
search无需声明接收  <Route path="/demo/home">
接收参数: const search = this.props.location.search;
          const {id,name}  = qs.parse(search.slice(1))
3.state参数（在地址栏中不显示,历史记录会在history中存在，清除历史记录会出错）
向组件传递state参数: <link to={{pathname:'/demo/home',state:{id:id,name:name}}}>
state无需声明接收  <Route path="/demo/home">
接收参数: const {id,name} = this.props.location.state || {}
4.编程式路由
<button onClick={()=>this.pushShow(id,name)}>
pushShow = ()=>{
    this.props.history.push('/demo/home/${id}/${name}');
    this.props.history.push('/demo/home?id=${id}&name=${name}');
    this.props.history.push('/demo/home',{id:id,name:name});
    // this.props.history.replace('/demo/home/${id}/${name}');
}
this.props.history.go(n)		//n>0 前进n, n<0 后退n
this.props.history.goBack()     //后退
this.props.history.goForward()   //前进
withRouter:(将一般组件加上路由组件的api) export default withRouter(一般组件)
只有路由组件才有this.props.history
BrowserRouter与HashRouter的区别
            1.底层原理不一样：
                        BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
                        HashRouter使用的是URL的哈希值。
            2.path表现形式不一样
                        BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
                        HashRouter的路径包含#,例如：localhost:3000/#/demo/test
            3.刷新后对路由state参数的影响
                        (1).BrowserRouter没有任何影响，因为state保存在history对象中。
                        (2).HashRouter刷新后会导致路由state参数的丢失！！！
            4.备注：HashRouter可以用于解决一些路径错误相关的问题。

九、扩展
setState更新状态的2种写法
    setState是同步方法，但react状态的更新是异步的
    (1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
                    
    (2). setState(updater, [callback])------函数式的setState
            this.setState((state,props)=>{
                return {count:state.count+1}
            },()=>{})
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
        1.对象式的setState是函数式的setState的简写方式(语法糖)
        2.使用原则：
                (1).如果新状态不依赖于原状态 ===> 使用对象方式
                (2).如果新状态依赖于原状态 ===> 使用函数方式
                (3).如果需要在setState()执行后获取最新的状态数据, 
                    要在第二个callback函数中读取

路由组件的懒加载
import {lazy,Suspense} from 'react'
const Home = lazy(()=> {import('./Home')})
const About = lazy(()=> {import('./About')})

import Loading from './Loading'

<Suspense fallback={<Loading/>}>
          <Route path="/about" component={About}/>
          <Route path="/home" component={Home}/>
</Suspense>
十、HOOKS
state hooks :
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  (每个状态都要useState)
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
effect hooks:
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => {
               componentDidMount()
       		componentDidUpdate() 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
           // componentWillUnmount()
          }
        }, [stateValue]) 
// 如果指定的是[], 回调函数只会在第一次render()后执行,[]内容表示watch哪个state,如果为不穿则watch所有
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
        componentWillUnmount()
ref hooks:
    (1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
    (2). 语法: const refContainer = useRef()
    (3). 作用:保存标签对象,功能与React.createRef()一样
example:
export default function Demo(){
    const [count,setCount] = React.useState(0)
    const myRef = React.useRef()
    React.useEffect(()=>{
        let timer = setInterval(()=>{
            setCount(count => count+1 )
        },1000)
        return ()=>{
            clearInterval(timer)
        }
    },[])
    //加的回调
    function add(){
        //setCount(count+1) //第一种写法
        setCount(count => count+1 )
    }
    //提示输入的回调
    function show(){
        alert(myRef.current.value)
    }
    //卸载组件的回调
    function unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    return (
        <div>
            <input type="text" ref={myRef}/>
            <h2>当前求和为：{count}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={unmount}>卸载组件</button>
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}             

Fragment类似于空标签，但空标签不能由属性， Fragment可以传其他属性，但只接受key属性   
    <Fragment><Fragment>
    <></>
### 作用
> 可以不用必须有一个真实的DOM根标签了

Context
### 理解
> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信
### 使用
```js
1) 创建Context容器对象：
    const XxxContext = React.createContext()  
//创建Context对象
const MyContext = React.createContext()
const {Provider,Consumer} = MyContext
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
    <xxxContext.Provider value={数据}>
        子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：
    //第一种方式:仅适用于类组件 
      static contextType = xxxContext  // 声明接收context
      this.context // 读取context中的value数据
      
    //第二种方式: 函数组件与类组件都可以
      <xxxContext.Consumer>
        {
          value => ( // value就是context中的value数据
            要显示的内容
          )
        }
      </xxxContext.Consumer>
```

###  注意

    在应用开发中一般不用context, 一般都它的封装react插件

Component存在的两个问题：
1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低
 原因：Component中的shouldComponentUpdate(nextProps,nextState)总是返回true
 办法1:
	重写shouldComponentUpdate()方法
	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
办法2:
	使用PureComponent(import {PureComponent} from 'react')
	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
	注意:
		只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false
		不要直接修改state数据, 而是要产生新数据

render props
如何向组件内部动态传入带内容的结构(标签)?
Vue中:
	使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
React中:
	使用children props: 通过组件标签体传入结构
	使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

children props
<A>
  <B>xxxx</B>
</A>
{this.props.children}
问题: 如果B组件需要A组件内的数据, ==> 做不到

render props
<A render={(data) => <C data={data}></C>}></A>
A组件: {this.props.render(内部state数据)}
C组件: 读取A组件传入的数据显示 {this.props.data}

错误边界：用来捕获后代组件错误，渲染出备用页面
特点：
只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
使用方式：
getDerivedStateFromError配合componentDidCatch

// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```
