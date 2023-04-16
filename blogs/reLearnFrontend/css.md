---
title: CSS
date: 2023-02-09
tags:
 - reLearnFrontend
categories:
 - reLearnFrontend
---

## 选择器

- id选择器（#myid）
- 类选择器（.myclassname）
- 标签选择器（div,h1,p）
- 后代选择器（h1 p）
- 相邻后代选择器（子）选择器（ul>li）
- 兄弟选择器（li~a）
- 相邻兄弟选择器（li+a）
- 属性选择器（a[rel="external"]）
- 伪类选择器（a:hover,li:nth-child）
- 伪元素选择器（::before、::after）
- 通配符选择器（*）

## 选择器权重

标签选择器、伪元素选择器：1,类选择器、伪类选择器、属性选择器：10,id 选择器：100,内联样式：1000

- !important声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0 ；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

## 盒模型

- IE 盒模型 box-sizing: border-box; 属性width，height包含 content、border 和 padding，指的是 content+padding+border。
- 标准盒模型 box-sizing: content-box; 属性width，height只包含内容content，不包含 border 和 padding

## Flex box（弹性盒布局模型,设为Flex布局以后，子元素的float、clear和vertical-align属性将失效）

- flex布局是CSS3新增的一种布局方式，将一个元素的display属性值设置为flex从而使它成为一个flex容器，它的所有子元素都会成为它的项目。
- 一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴。我们可以使用flex-direction来指定主轴的方向。
- 可以使用justify-content来指定元素在主轴上的排列方式，使用align-items来指定元素在交叉轴上的排列方式。还
- 可以使用flex-wrap来规定当一行排列不下时的换行方式。

对于容器中的项目，我们可以使用order属性来指定项目的排列顺序，还可以使用flex-grow来指定当排列空间有剩余的时候，
项目的放大比例。还可以使用flex-shrink来指定当排列空间不足时，项目的缩小比例。

- 6个属性设置在容器上。
    - flex-direction: row | row-reverse | column | column-reverse;属性决定主轴的方向（即项目的排列方向）。
    - flex-wrap: nowrap | wrap | wrap-reverse;属性定义，如果一条轴线排不下，如何换行。
    - flex-flow: flex-direction || flex-wrap;属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
    - justify-content: flex-start | flex-end | center | space-between | space-around;属性定义了项目在主轴上的对齐方式。
    - align-items: flex-start | flex-end | center | baseline | stretch;属性定义项目在交叉轴上如何对齐。
    - align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
- 6个属性设置在项目上。
    - order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    - flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    - flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    - flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认
    - 值为auto，即项目的本来大小。
    - flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。
    - align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

## width:auto 和 width:100%的区别

- width:auto 使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。
- width:100% 使元素box的宽度等于父元素的content box的宽度。

## margin 重叠问题

- 相邻兄弟元素的 marin-bottom 和 margin-top 的值发生重叠,margin 为二者较大者
- 父元素的margin-top和子元素的margin-top发生重叠
- 高度为auto的父元素的margin-bottom和子元素的margin-bottom发生重叠
- 没有内容的元素，自身的margin-top和margin-bottom发生的重叠

## BFC 规范

- BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素
- 创建BFC
    - 根元素或包含根元素的元素
    - 浮动元素float＝left|right或inherit（≠none）
    - 绝对定位元素position＝absolute或fixed
    - display＝inline-block|flex|inline-flex|table-cell或table-caption
    - overflow＝hidden|auto或scroll(≠visible)

## CSS动画

### transition（过渡）

- transition（过渡）元素从一个属性(color)的某个值(red)过渡到这个属性(color)的另外一个值(green)，这是一个状态的转变，需要一种条件来触发这种转变，比如:hover、:focus、:checked、媒体查询或者JavaScript。
- transition: property(属性的名称) duration(完成过渡效果需要多少秒或毫秒) timing-function(速度效果) delay(延时);
    - 需要事件触发，所以没法在网页加载时自动发生
    - 是一次性的，不能重复发生，除非一再触发
    - 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
    - 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

    ```css
    #box {
      color: red;
      transition: transform 1s ease-in 1s;
      transition: color 1s ease-in 1s;
    }
    #box:hover {
        transform: rotate(180deg) scale(.5, .5);
        color: green;
    }
    ```

### animation（动画）

- animation: name duration timing-function delay iteration-count direction play-state fill-mode;

```css
    .box {
      height: 100px;
      width: 100px;
      border: 15px solid black;
      animation: changebox 1s ease-in-out 1s infinite alternate running forwards;
    }
    .box:hover {
      animation-play-state: paused;
    }
    @keyframes changebox {
      10% {
        background: red;
      }
      50% {
        width: 80px;
      }
      70% {
        border: 15px solid yellow;
      }
      100% {
        width: 180px;
        height: 180px;
      }
    }
```

### transform（变形）

- 用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系。
- translate（移动）	translate是transform的一个属性值，即移动。

## 常见的元素隐藏方式

- display:none;隐藏元素，渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- visibility:hidden;隐藏元素。元素在页面中仍占据空间，但是不会响应绑定的监听事件。
- opacity:0;将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- 使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- z-index 负值，来使其他元素遮盖住该元素，以此来实现隐藏。

## link和@import的区别

- link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
- link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
- link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
- link支持使用Javascript控制DOM去改变样式；而@import不支持。
