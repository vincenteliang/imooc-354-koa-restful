# koa-restful

> 课程链接
> https://coding.imooc.com/class/354.html

## 第1章 学习之前要告诉你的

> 这一章只有一节，也只有一个目的，就是告诉你这门课程讲了什么，最终做出的效果，以及学习这门课程你需要先掌握哪些技术。

### 1-1 关于这门课程你想知道的都在这一节里面了

- 课程目标
  - 理解RESTful API的6个限制和若干最佳实践
  - 掌握Koa2、Postman、 MongoDB、JWT等技术
  - 运用上述技术搭建仿知乎RESTful API
  - 掌握阿里云线上部署方法
- 功能技术分析
  - RESTful API理论
  - Koa2
  - Postman
  - MongoDB
  - JWT
  - 阿里云部署
- 前置知识
  - Node.js 基础
  - ES6、ES7 基础
- 重难点分析
  - RESTful API理论
  - JWT认证原理
  - 复杂的数据库关系（一对多、多对多等）
- 课程建议
  - 理论部分做到自问自答
  - 实战部分做到举一反三
  - 不止于本课程，学习更多技术

## 第2章 跟着 GitHub 认识 RESTful API

> 本章以全球最大的同性社交社区 GitHub 的 RESTful API 十几个最佳实践为例，让你掌握最完整的 RESTful API 理论

### 2-1 REST 是什么以及它的 6 个限制

#### REST是什么：万维网软件结构风格

REST：**Re**presentational **S**tate **T**ransfer

- Representational: 数据的表现形式(JSON、XM.....)
- State: 当前状态或者数据
- Transfer: 数据传输

#### RESTful的6个限制

1. 客户一服务器( Client一Server )
   - 关注点分离
   - 服务端专注数据存储,提升了简单性
   - 前端专注用户界面,提升了可移植性
1. 无状态( Stateless )
   - 所有用户会话信息都保存在客户端
   - 每次请求必须包括所有信息,不能依赖上下文信息
   - 服务端不用保存会话信息,提升了简单性、可靠性、可见性
1. 缓存( Cache )
   - 所有服务端响应都要被标为可缓存或不可缓存
   - 减少前后端交互,提升了性能
1. 统一接口( Uniform Interface )
   - 接口设计尽可能统一通用,提升了简单性、可见性
   - 接口与实现解耦,使前后端可以独立开发迭代
1. 分层系统( Layered System )
   - 每层只知道相邻的一层,后面隐藏的就不知道了
   - 客户端不知道是和代理还是真实服务器通信
   - 其他层:安全层、负载均衡、缓存层等
1. 按需代码( Code一On一Demand可选 )
   - 客户端可以下载运行服务端传来的代码(比如JS)
   - 通过减少一些功能,简化了客户端
 
### 2-2 统一接口的限制

- 资源的标识
  - 资源是任何可以命名的事物,比如用户、评论等
  - 每个资源可以通过URI被唯一地标识
    - https://api.github.com/users
    - https://api.github.com/users/lewis617
- 通过表述来操作资源
  - 表述就是Representation，比如JSON、XML等
  - 客户端不能直接操作(比如SQL)服务端资源
  - 客户端应该通过表述(比如JSON)来操作资源
- 自描述消息
  - 每个消息（请求或响应）必须提供足够的信息让接受者理解
  - 媒体类型（application/json、application/xml）
  - HTTP方法：GET（查）、POST（增）、DELETE（删）
  - 是否缓存： Cache-Control
- 超媒体作为应用状态引擎
  - 超媒体：带文字的链接
  - 应用状态：一个网页
  - 引擎：驱动、跳转
  - 合起来：点击链接跳转到另一个网页

### 2-3 RESTful API 简介

#### RESTful API具体什么样子？

- 基本的URI ，如https：//api.github.com/users
- 标准HTTP方法，如GET， POST， PUT， PATCH， DELETE
- 传输的数据媒体类型，如JSON， XML

#### 现实举例

| Methed |   URI    |   Meaning    |
| :----: | :------: | :----------: |
|  GET   |  /users  | 获取user列表 |
|  GET   | /users/1 |  查看user1   |
|  POST  |  /users  | 新建一个user |
|  PUT   | /users/1 | 更新 user 1  |
| DELETE | /users/1 | 删除 user 1  |

### 2-4 RESTful API 设计最佳实践

- 请求设计规范
  - URI使用名词，尽量用复数，如/users
  - URI使用嵌套表示关联关系，如/users/12/repos/5
  - 使用正确的HTTP方法，如GET/POST/PUT/DELETE
  - 不符合CRUD的情况：POST/action/子资源
- 相应设计规范
  - 查询
  - 分页
  - 字段过滤
  - 状态码
  - 错误处理
- 安全
  - HTTPS
  - 鉴权
  - 限流
- 开发者友好
  - 文档
  - 超媒体

## 第3章 用 Koa 说 Hello World

> 本章将带你了解什么是 Koa 框架，搭建 Koa 框架的开发环境，并且编写第一个 Koa 框架的程序。不仅如此，重点是还要带你理解什么是 Koa 中间件以及经典的洋葱模型。

### 3-1 Koa 简介

#### 一句话简介

> 基于Node.js的下一代web开发**框架**

- 基于Node.js： Node.js模块
- 下一代：蚕食第一代Web框架Express的市场
- Web框架：不是命令行工具、不是算法

#### 官网简介

> Koa是一个新的web框架，由Express幕后的原班人马打造，致力于成为web应用和API开发领域中的一个更小、更富有表现力、更健壮的基石。通过利用async函数， Koa帮你丢弃回调函数，并有力地增强错误处理。Koa并没有捆绑任何中间件，而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

- 由Express幕后的原班人马打造
- Web应用和API开发领域
- 更小、更富有表现力、更健壮
- 利用async函数，丢弃回调函数
- 增强错误处理：try catch
- 没有捆绑任何中间件
- 快速而愉快地编写程序

### 3-2 安装搭建第一个 Koa 程序

> 操作步骤
> - 初始化项目
> - 安装Koa
> - 编写Hello World
> - 学习自动重启

#### 初始化项目

在合适的位置新建项目文件夹

在项目目录下执行`npm init`

#### 安装Koa

`npm i koa --save`

新建JS文件，比如`index.js`

#### 编写Hello World

[commit](https://github.com/vincenteliang/koa-restful/commit/81a902b36fec79c38d47099d33400bee46f2f790)

#### 自动重启

`npm i nodemon --save-dev`

由于是本地安装所以并不能在项目文件夹下直接执行`nodemon index.js`，我们在`package.json`中添加如下命令：

```json package.json
"scripts": {
    "start": "nodemon index.js"
}
```

### 3-3 Koa 中间件与洋葱模型

> 操作步骤
> - 学习 async await
> - 学习编写Koa中间件
> - 学习洋葱模型

#### async await

获取两个GitHub的接口并返回

[commit](https://github.com/vincenteliang/koa-restful/commit/7a28c4d7dfcc24334934c0eff59816a28f0c8bea)

#### 编写Koa中间件

[commit](https://github.com/vincenteliang/koa-restful/commit/7a28c4d7dfcc24334934c0eff59816a28f0c8bea)

#### 洋葱模型

上节代码打印的顺序为：1 3 5 4 2，类似一个🧅

## 第4章 Koa 框架的路由与 RESTful API 最佳实践

> 本章主要讲解 Koa 框架的路由。和其他课程的区别在于，不仅要学习 Koa 框架本身的路由用法，还要学习实现 REST 风格的路由用法。

### 4-1 路由简介

#### 路由是什么？

- 决定了不同URL是如何被不同地执行的
- 在Koa中，是一个中间件

#### 为什么要用路由？

- 如果没有路由，会怎么样？
- 路由存在的意义

#### 如果没有路由

- 所有请求都做了相同的事
- 所有请求都会返回相同的结果

#### 路由存在的意义

- 处理不同的URL
- 处理不同的HTTP方法
- 解析URL上的参数

### 4-2 自己编写 Koa 路由中间件

> 操作步骤
> - 处理不同的URL
> - 处理不同的HTTP方法
> - 解析URL上的参数

[commit](https://github.com/vincenteliang/koa-restful/commit/0035b0a790a662b8182647d45e391b3119114a8d)

### 4-3 使用 koa-router 实现路由

> 操作步骤
> - 更优雅地实现路由基本功能
> - 演示一些高级路由功能，如前缀、多中间件

#### 路由基本功能

[commit](https://github.com/vincenteliang/koa-restful/commit/318d579ce4639b442a12ff18d7a24d03f4e0087f)

#### 高级路由功能

[commit](https://github.com/vincenteliang/koa-restful/commit/5e417fd9b71027a55291f9d7a51c8a26794dc77d)

### 4-4 HTTP options 方法的作用是什么

#### 为何要了解options方法的作用？

- 这是一道面试题
- 帮助理解koa-router的allowedMethods的作用

#### HTTP options方法的作用是什么？

- 检测服务器所支持的请求方法
- CORS中的预检请求

#### allowedMethods的作用

- 响应options方法，告诉它所支持的请求方法
- 相应地返回405（不允许）和501（没实现）

[commit](https://github.com/vincenteliang/koa-restful/commit/f0207fd03319e9bd970dbcac739fb6b66667d61d)

### 4-5 RESTful API 最佳实践——增删改查应该返回什么响应

> 操作步骤
> - 实现增删改查
> - 返回正确的响应

[commit](https://github.com/vincenteliang/koa-restful/commit/5fdff16e660731945fad42658de902b5bdebb17d)

## 第5章 Koa 框架的控制器以及设计更合理的目录结构

> 本章主要讲解 Koa 框架的控制器部分的内容。从如何获取 HTTP 的请求参数，到发送 HTTP 的响应，一应俱全。让你明白目录结构是怎么来设计的更合理。

### 5-1 控制器简介

- 什么是控制器？
  - 拿到路由分配的任务，并执行
  - 在Koa中，是一个中间件
- 为什么要用控制器？
  - 获取HTTP请求参数
  - 处理业务逻辑
  - 发送HTTP响应
- 获取HTTP请求参数
  - Query String, 如 `?q=keyword`, 一般为可选
  - Router Params, 如 `/users/:id`, 一般为必选
  - Body, 如 `{ name： "李雷" }`
  - Header, 如 `Accept`, `Cookie`
- 发送HTTP响应
  - 发送Status，如`200`/`400`等
  - 发送Body，如`{ name："李雷" }`
  - 发送Header，如`Allow`、`Content-Type`
- 编写控制器最佳实践
  - 每个资源的控制器放在不同的文件里
  - 尽量使用 类+类方法 的形式编写控制器
  - 严谨的错误处理

### 5-2 获取 HTTP 请求参数

> 操作步骤
> - 学习断点调试
> - 获取query (ctx.query)
> - 获取router params (ctx.params)
> - 获取body (ctx.request.body)
> - 获取header (ctx.header)

#### 断点调试

VSCode中按F5进入调试并设置断点

#### 获取body

koa不支持解析请求体，需要引入中间件**koa-bodyparser**

`npm i koa-bodyparser --save`

[commit](https://github.com/vincenteliang/koa-restful/commit/98e21309f4211dd84adece36baeb2762429bf56e)

### 5-3 发送 HTTP 响应

> 操作步骤
> - 发送 status
> - 发送 body
> - 发送 header
> - 实现用户的增删改查

#### 发送 status & body

`ctx.status = 204;`

`ctx.body = '<h1>这是主页</h1>';`

#### 发送 header

[commit](https://github.com/vincenteliang/koa-restful/commit/fd4c2302270c0094bd30778b4eff611e4b1ca48b)

#### 实现用户的增删改查

[commit](https://github.com/vincenteliang/koa-restful/commit/fd4c2302270c0094bd30778b4eff611e4b1ca48b)

### 5-4 更合理的目录结构

> 操作步骤
> - 将路由单独放在一个目录
> - 将控制器单独放在一个目录
> - 使用 类+类方法 的方式组织控制器

新建总文件夹`/app`，并修改入口文件

```json package.json
"scripts": {
    "start": "nodemon app"
}
```

- /app
  - /routes
    - home.js
    - users.js
  - /controllers
    - home.js
    - users.js

[commit](https://github.com/vincenteliang/koa-restful/commit/49e15bcd9d9fcd3d45fe93895c33dc6315238cc6)

## 第6章 多种方案实现错误处理机制

> 本章主要讲解多种方案的错误处理。主要分三方面，一是 Koa 框架自带的错误处理，一是编写错误处理中间件，一是使用优秀的错误处理中间件。

### 6-1 错误处理简介

- 什么是错误处理？
  - 编程语言或计算机硬件里的一种机制
  - 处理软件或信息系统中出现的异常状况
- 异常状况有哪些？
  - 运行时错误，都返回500
  - 逻辑错误，如找不到（404）、先决条件失败（412）、无法处理的实体（参数格式不对，422）等
- 为什么要用错误处理？
  - 防止程序挂掉
  - 告诉用户错误信息
  - 便于开发者调试

### 6-2 Koa 自带的错误处理

> 操作步骤
> - 制造404、412、500三种错误
> - 了解Koa自带的错误处理做了什么

[commit](https://github.com/vincenteliang/koa-restful/commit/777be207afd1e821569682b65c84d47b421ced79)

### 6-3 自己编写错误处理中间件

> 操作步骤
> - 自己编写错误处理中间件
> - 制造404、412、500三种错误来测试

[commit](https://github.com/vincenteliang/koa-restful/commit/90ad115d162f2d20aec649ccbaf800cbd925ad74)

### 6-4 使用 koa-json-error 进行错误处理

> 操作步骤
> - 安装koa-json-error
> - 使用koa-json-error的默认配置处理错误
> - 修改配置使其在生产环境下禁用错误堆栈的返回

`npm i koa-json-error --save`

[commit](https://github.com/vincenteliang/koa-restful/commit/bb723d89a8ea3a5e7129e0bda27f7c78b35d4eca)

### 6-5 使用 koa-parameter 校验参数

> 操作步骤
> - 安装koa一parameter
> - 使用koa一parameter校验参数
> - 制造422错误来测试校验结果

`npm i koa-parameter --save`

[commit](https://github.com/vincenteliang/koa-restful/commit/e6ea2ac4cd3ac96dd1be9673856cc9db9beffa60)

## 第7章 第一批用户入库啦~~

> 本章主要讲解 NoSQL 概念以及 MongoDB 数据库的理论与入门实践。通过 MongoDB Atlas 云数据库学习 MongoDB 的增删改查等常见操作。

### 7-1 NoSQL 简介

- 什么是NoSQL
  - 对不同于传统的关系型数据库的数据库管理系统的统称
- NoSQL数据库的分类
  - 列存储（HBase）
  - 文档存储（MongoDB）
  - Key-value存储（Redis）
  - 图存储（FlockDB）
  - 对象存储（db4o）
  - XML存储（BaseX）
- 为什么要用NoSQL
  - 简单（没有原子性、一致性、隔离性等复杂规范）
  - 便于横向拓展
  - 适合超大规模数据的存储
  - 很灵活地存储复杂结构的数据（Schema Free）

### 7-2 MongoDB 简介

- 什么是MongoDB ？
  - 来自于英文单词"Humongous”， 中文含义为"庞大”
  - 面向文档存储的开源数据库
  - 由C++编写而成
- 为什么要用MongoDB ？
  - 性能好（内存计算）
  - 大规模数据存储（可拓展性）
  - 可靠安全（本地复制、自动故障转移）
  - 方便存储复杂数据结构（Schema Free）

### 7-3 云数据库——MongoDB Atlas

> 操作步骤
> - 注册用户
> - 创建集群
> - 添加数据库用户
> - 设置IP地址白名单
> - 获取连接地址

如果连接mongodb过程中出现以下错误，可以尝试设置付款方式/检查用户名&数据库名是否正确更改/等等再试

``` shell
Error: querySrv ESERVFAIL _mongodb._tcp.vincentebase.yqjup.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (dns.js:203:19) {
  errno: 'ESERVFAIL',
  code: 'ESERVFAIL',
  syscall: 'querySrv',
  hostname: '_mongodb._tcp.vincentebase.yqjup.mongodb.net'
}

Error: queryTxt ESERVFAIL vincentebase.yqjup.mongodb.net
    at QueryReqWrap.onresolve [as oncomplete] (dns.js:203:19) {
  errno: 'ESERVFAIL',
  code: 'ESERVFAIL',
  syscall: 'queryTxt',
  hostname: 'vincentebase.yqjup.mongodb.net'
}
```

[stackoverflow](https://stackoverflow.com/questions/50362647/connecting-to-mongodb-atlas-from-firebase-functions/58822693#58822693?newreg=a3af857c5c944c34a5f48ff365b97c0e)上的回答

### 7-4 使用 Mongoose 连接 MongoDB

> 操作步骤
> - 安装 Mong oose
> - 用 Mongoose 连接 MongoDB

`npm i mongoose --save`

[commit](https://github.com/vincenteliang/koa-restful/commit/af0f695574c86e45be5125a9dbadf8f835c0399d)

### 7-5 设计用户模块的 Schema

> 操作步骤
> - 分析用户模块的属性
> - 编写用户模块的Schema
> - 使用Schema生成用户Model

[commit](https://github.com/vincenteliang/koa-restful/commit/7bd39c25ba777cf0027a1f41e3b0a0d8b2150e75)

### 7-6 用 MongoDB 实现用户的增删改查

> 操作步骤
> - 用Mongoose实现增删改查接口
> - 用Postman测试增删改查接口

[commit](https://github.com/vincenteliang/koa-restful/commit/b83cff0e2fbbb85334b6cacb45387aa86d31fc84)

## 第8章 JWT 在 Koa 框架中实现用户的认证与授权

> 本章主要讲解 JWT 如何实现用户的认证与授权。从 Session 开始讲解过渡到 JWT，关键在于 Session 和 JWT 的对比。以及通过 Koa 框架的 JWT 中间件实现用户注册于授权登录功能。

### 8-1 Session 简介

- Session的优势
  - 相比JWT，最大的优势就在于可以主动清除session了
  - session保存在服务器端，相对较为安全
  - 结合cookie使用，较为灵活，兼容性较好
- Session的劣势
  - cookie + session在跨域场景表现并不好
  - 如果是分布式部署，需要做多机共享session机制
  - 基于cookie的机制很容易被CSRF
  - 查询session信息可能会有数据库查询操作
- Session相关的概念介绍
  - session: 主要存放在服务器端，相对安全
  - cookie: 主要存放在客户端，并且不是很安全
  - sessionStorage: 仅在当前会话下有效，关闭页面或浏览器后被清除
  - localstorage: 除非被清除，否则永久保存

### 8-2 JWT 简介

#### 什么是JWT

- JSON Web Token是一个开放标准（RFC 7519）
- 定义了一种紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行安全传输
- 该信息可以验证和信任，因为是经过数字签名的

#### JWT的构成

- 头部（Header）
  - typ: token的类型， 这里固定为JWT
  - alg: 使用的hash算法，例如：HMACSHA256或者RSA
  - 编码前: {"alg":"HS256","typ":"JWT"}
  - Base64编码: 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9'
- 有效载荷（Payload）
  - 存储需要传递的信息，如用户ID、用户名等
  - 还包含元数据，如过期时间、发布人等
  - 与Header不同，Payload可以加密
  - 编码前: {"user_id":"zhangsan"}
  - Base64编码: 'eyJ1c2VyX2lkIjoiemhhbmdzYW4ifQ=='
  - Base64Url编码: 'eyJ1c2VyX2lkIjoiemhhbmdzYW4ifQ'
- 签名（Signature）
  - 对Header和Payload部分进行签名
  - 保证Token在传输的过程中没有被篡改或者损坏
  - Signature = HMACSHA256(base64UrlEncode(header)+"."+base64UrlEncode(payload), secret)

#### JWT工作原理

<!-- ![JWT工作原理](#) -->
<image src="https://blog-1251959181.cos.ap-beijing.myqcloud.com/posts/354/JWT.png" />

### 8-3 JWT vs. Session

|             |          JWT           |            Session             |
| :---------: | :--------------------: | :----------------------------: |
|  可拓展性   |      无缝水平拓展      |          适合垂直拓展          |
|   安全性    | JS可修改JWT，签名+加密 |                                |
| RESTful API |         无状态         |             有状态             |
|    性能     | 传输信息多，请求开销大 | 需要查找用户信息，服务器开销大 |
|   时效性    |    只有到期才可销毁    |       可以在服务器端更新       |

### 8-4 在 Node.js 中使用 JWT

> 操作步骤
> - 安装 jsonwebtoken
> - 签名
> - 验证

`npm i jsonwebtoken`

```shell
node
> jwt = require('jsonwebtoken');
> token = jwt.sign({name: 'vincente'}, 'secret');
> jwt.decode(token);
> jwt.verify(token, 'secret');
```

### 8-5 实现用户注册

> 操作步骤
> - 设计用户Schema
> - 编写保证唯一性的逻辑

[commit](https://github.com/vincenteliang/koa-restful/commit/b84be5ce15adaa2088e4b4a115c0c8417b844bff)

### 8-6 实现登录并获取 Token

> 操作步骤
> - 登录接口设计
> - 用jsonwebtoken生成token

[commit](https://github.com/vincenteliang/koa-restful/commit/8d617dc9ec1c04c963741b472ff7490dbb1f0759)

### 8-7 自己编写 Koa 中间件实现用户认证与授权

> 操作步骤
> - 认证：验证token ，并获取用户信息
> - 授权：使用中间件保护接口

[commit](https://github.com/vincenteliang/koa-restful/commit/25221b3fe3298640c31b6597e7951812efadf32e)

### 8-8 用 koa-jwt 中间件实现用户认证与授权

> 操作步骤
> - 安装 koa-jwt
> - 使用中间件保护接口
> - 使用中间件获取用户信息

`npm i koa-jwt --save`

[commit](https://github.com/vincenteliang/koa-restful/commit/ff9b13155806aa5185210f732a8d52a29a248843)

<!-- [commit](https://github.com/vincenteliang/koa-restful/commit/) -->