---
title: H5 iPhone 安全距离适配
date: 2023-05-29
tags:
 - frontend
categories:
 - frontend
---

## 安全区域

- 可视窗口范围，处于安全区域的内容不受圆角、齐刘海、小黑条影响

## viewport-fit

- iOS11 新增特性，苹果公司为了适配 iPhoneX 对现有 viewport meta 标签的一个扩展，用于设置网页在可视窗口的布局方式，可设置三个值：
    - contain: 可视窗口完全包含网页内容（左图）
    - cover：网页内容完全覆盖可视窗口（右图）
    - auto：默认值，跟 contain 表现一致
- 网页默认不添加扩展的表现是 viewport-fit=contain，需要适配 iPhoneX 必须设置 viewport-fit=cover。

## env() 和 constant()

- iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，四个预定义的变量：
    - safe-area-inset-left：安全区域距离左边边界距离
    - safe-area-inset-right：安全区域距离右边边界距离
    - safe-area-inset-top：安全区域距离顶部边界距离
    - safe-area-inset-bottom：安全区域距离底部边界距离(对应小黑条的高度,横竖屏时值不一样)

```css
<meta name="viewport" content="width=device-width, viewport-fit=cover">

@supports (padding-bottom: constant(safe-area-inset-bottom)) or (padding-bottom: env(safe-area-inset-bottom)) {
  body {
    /* 顺序不能换 */
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  }
}
```
