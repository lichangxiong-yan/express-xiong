// 引入 express
const express = require('express')

// 引入express-async-errors
require("express-async-errors")

const indexRouter = require('./routers/indexRouter')
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


// 处理路由中间件

app.use('/',indexRouter)

// 统一处理错误，须要放置子啊中间件与路由代码之后
app.use((err,req,res,next)=>{
  console.log(err)

  res.status(500).send(err.message)

})
//监听端口
app.listen(3000,()=>{
  console.log('服务启动成功')
})