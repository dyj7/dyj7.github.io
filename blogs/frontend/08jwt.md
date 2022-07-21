---
title: JSON Web Token(JWT)
date: 2022-07-21
tags:
 - frontend
categories:
 - frontend
---

## 跨域认证

互联网服务离不开用户认证:

- 用户向服务器发送用户名和密码。
- 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
- 服务器向用户返回一个 session_id，写入用户的 Cookie。
- 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
- 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

缺点：

- 扩展性（scaling）不好。单机没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求 session 数据共享，每台服务器都能够读取 session。

解决：

- 服务器不保存 session 数据，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

## JWT 的原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户

```JSON
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2022年7月22日0点0分"
}
```

用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名

## JWT 的数据结构

JWT 真实模样:

<img src="./images/08-1.png">

中间用点（.）分隔成三个部分,JWT 的三个部分是`Header.Payload.Signature`：

- Header（头部）
- Payload（负载）
- Signature（签名）

## JWT 的使用方式

- 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。
- 客户端每次与服务器通信，都要带上这个 JWT。可以把它放在 Cookie 里面自动发送，这样不能跨域，更好的做法是放在 HTTP 请求的头信息Authorization字段里面。`Authorization: Bearer <token>`
- 另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。
