// 引入 express
const express = require('express')

// 引入 express-session 中间件模块
const session = require("express-session");

// 引入express-async-errors
require("express-async-errors")
// 引入路由中间件文件
const indexRouter = require('./routers/indexRouter')
const userRouter = require('./routers/userRouter.js')

// 生成express 实例
const app = express()

// 处理一下模板引擎相关设置
app.set("view engine" , "ejs")
app.set("views","./views")

// 处理一下静态资源
app.use(express.static('./public'))

// 处理一下中间件
app.use(express.json())
app.use(express.urlencoded({extended:true}))


/**
 * session 处理
 * 会给 req 对象上添加一个 session 的属性
 * 注意：在开发工程中，修改了代码，session 就会重新开始
 */
app.use(session({
     // 秘钥
     secret: "asdfasdfaasdf23rfdsfasdfasdf",
     // 是否每次有请求的时候都去更新有效时间
     resave: false,
     // 是否初始化时就设置一次
     saveUninitialized: true
}))

// 处理路由中间件

app.use('/',indexRouter)
app.use("/users", userRouter);

// 统一处理错误，须要放置子啊中间件与路由代码之后
app.use((err,req,res,next)=>{
  console.log(err)

  res.status(500).send(err.message)

})
//监听端口
app.listen(3000,()=>{
  console.log('服务启动成功')
})