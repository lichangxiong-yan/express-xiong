const express = require('express')
const auth = require("../middlewares/auth");
const router = express.Router()

// GET / 欢迎页面
router.get('/',(req,res)=>{
  res.render('welcome')
})

// GET /chatroom 聊天室页面
router.get("/chatroom", auth, (req, res) => {

  // // 判断是否有登录
  // if(req.session.auth){
  //   //登录了
  //   res.render("chatroom");
  // }else{
  //   //没有登录 ，打回到登录页面上面去
  //   res.redirect('/login')

  // }
  res.render("chatroom");
});

// GET /login 登录页面
router.get("/login",(req,res)=>{
  res.render("login")
})
module.exports = router