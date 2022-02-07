---
title: CSS 面试知识点总结
date: 2021-01-01
tags:
 - css interview
categories:
 - interview
---

## 盒子模型

- 有两种盒子模型：IE盒模型（border-box）、W3C标准盒模型（content-box）
- 盒模型：分为内容（content）、填充（padding）、边框（border）、边界（margin）四个部分
- IE盒模型和W3C标准盒模型的区别：
    - W3C标准盒模型：属性width，height只包含内容content，不包含border和padding
    - IE盒模型：属性width，height包含content、border和padding，指的是content+padding+border。
- 可以通过修改元素的box-sizing属性来改变元素的盒模型

## CSS 选择符

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

## 伪类与伪元素的区别

- 伪类和伪元素是用来修饰不在文档树中的部分。
- 伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
- 伪元素用于创建一些不在文档树中的元素，并为其添加样式。

## CSS 中哪些属性可以继承？

- 字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。
表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。
- 当一个属性不是继承属性的时候，可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

## CSS 优先级算法如何计算？

- 选择器的特殊性值分为四个等级，如下：
    - 标签内选择符x,0,0,0
    - ID选择符0,x,0,0
    - class选择符/属性选择符/伪类选择符	0,0,x,0
    - 元素和伪元素选择符0,0,0,x
- 每个等级的初始值为0
- 每个等级的叠加为选择器出现的次数相加
- 不可进位，比如0,99,99,99
- 依次表示为：0,0,0,0
- 每个等级计数之间没关联
- 等级判断从左向右，如果某一位数值相同，则判断下一位数值
- 如果两个优先级相同，则最后出现的优先级高，!important也适用
- 通配符选择器的特殊性值为：0,0,0,0
- 继承样式优先级最低，通配符样式优先级高于继承样式
- !important（权重），它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以认为它的特殊性值为1,0,0,0,0。

## 伪类 LVHA 的解释?

- a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类:link、:visited、:hover、:active；

## 如何居中 div？

- 对于宽高固定的元素
    - 以利用margin:0 auto来实现元素的水平居中。
    - 利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。
    - 利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。
    - 利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。
    - 使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。
- 对于宽高不定的元素，上面的后面两种方法，可以实现元素的垂直和水平的居中。

## display 有哪些值？

- inline	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- block	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- none	元素不显示，并从文档流中移除。
- list-item	像块类型元素一样显示，并添加样式列表标记。
- table	此元素会作为块级表格来显示。
- inherit	规定应该从父元素继承display属性的值。
- flex  弹性布局
- grid  栅格布局
- contents  设置了display: contents的元素本身不会被渲染，但是其子元素能够正常被渲染。

## position 的值 relative 和 absolute 定位原点是？

- absolute：生成绝对定位的元素，相对于值不为static的第一个父元素的padding box进行定位，也可以理解为离自己这一级元素最近的一级position设置为absolute或者relative的父元素的padding box的左上角为原点的。
- fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative：生成相对定位的元素，相对于其元素本身所在正常位置进行定位。
- static：默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。
- inherit：规定从父元素继承position属性的值。
- relative定位的元素，是相对于元素本身的正常位置来进行定位的。
- absolute定位的元素，是相对于它的第一个position值不为static的祖先元素的padding box来进行定位的。首先需要找到绝对定位元素的一个position的值不为static的祖先元素，然后相对于这个祖先元素的padding box来定位，也就是说在计算定位距离的时候，padding的值也要算进去。

## CSS3 有哪些新特性

- 新增各种CSS选择器	（:not(.input)：所有class不是“input”的节点）
- 圆角		（border-radius:8px）
- 多列布局	（multi-column layout）
- 阴影和反射	（Shadow\Reflect）
- 文字特效		（text-shadow）
- 文字渲染		（Text-decoration）
- 线性渐变		（gradient）
- 旋转			（transform）
- 缩放，定位，倾斜，动画，多背景
- 例如：transform:\scale(0.85,0.90)\translate(0px,-30px)\skew(-9deg,0deg)\Animation:

## Flex box（弹性盒布局模型）

- 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
- flex-direction属性决定主轴的方向（即项目的排列方向）。
- flex-wrap属性定义，如果一条轴线排不下，如何换行。
- flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
- justify-content属性定义了项目在主轴上的对齐方式。
- align-items属性定义项目在交叉轴上如何对齐。
- align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## CSS浏览器的兼容性

- 浏览器默认的margin和padding不同，加一个全局的*{margin:0;padding:0;}来统一。
- Chrome中文界面下默认会将小于12px的文本强制按照12px显示，-webkit-transform:scale(0.5);

## width:auto 和 width:100%的区别

- width:100%会使元素box的宽度等于父元素的content box的宽度。
- width:auto会使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。

## base64 编码的优点和缺点

- base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的url属性。
- 使用base64的优点是：减少一个图片的HTTP请求
- 使用base64的缺点是：
    - 根据base64的编码原理，编码后的大小会比原文件大小大1/3，如果把大图片编码到html/css中，不仅会造成文件体积的增加，影响文件的加载速度，还会增加浏览器对html或css文件解析渲染的时间。
    - 使用base64无法直接缓存，要缓存只能缓存包含base64的文件，比如HTML或者CSS，这相比域直接缓存图片的效果要差很多。
    - 兼容性的问题，ie8以前的浏览器不支持。
- 一般一些网站的小图标可以使用base64图片来引入。

## 'display'、'position'和'float'的相互关系

- 首先判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。
- 然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。
- 如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。
- 如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。

## margin合并

- 块级元素的上外边距（margin-top）与下外边距（margin-bottom）有时会合并为单个外边距，这样的现象称为“margin合并”。

## 对 BFC 规范（块级格式化上下文：block formatting context）的理解？

- BFC是一个独立的布局环境，可以理解为一个容器，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。
- 如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。
- 创建BFC
    - 根元素或包含根元素的元素
    - 浮动元素float＝left|right或inherit（≠none）
    - 绝对定位元素position＝absolute或fixed
    - display＝inline-block|flex|inline-flex|table-cell或table-caption
    - overflow＝hidden|auto或scroll(≠visible)
