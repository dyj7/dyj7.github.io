---
title: Web 安全(白帽子讲Web安全)
date: 2021-01-01
tags:
 - frontend
categories:
 - frontend
---

## 安全三要素

安全三要素是安全的基本组成元素，分别是机密性（Confidentiality）、完整性（Integrity）、可用性（Availability）

- 机密性  要求保护数据内容不能泄露，加密是实现机密性要求的常见手段。
- 完整性  则要求保护数据内容是完整、没有被篡改的。常见的保证一致性的技术手段是数字签名。
- 可用性 要求保护资源是“随需而得”。

## 浏览器安全

### 同源策略

浏览器的同源策略，限制了来自不同源的“document”或脚本，对当前“document”读取或设置某些属性
