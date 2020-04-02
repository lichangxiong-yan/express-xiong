//用来连接数据库的文件

const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/express-xiong"

mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log("数据库连接成功")
})
.catch((error)=>{
  console.log("数据库连接失败")
  console.log(error)
})


module.exports = mongoose

