const express = require('express')
const UsernModel =  require('../db/models/userModel')

const router =  express.Router()

//登录操作
// POST /users/login 登录操作
router.post('/login',async (req,res)=>{

  //获取页面传递过来的参数
  const { username , password} = req.body

  //判断是否已经注册过
  let user= await UsernModel.findOne({username})
  if(!user){
    // 不存在，先做注册
    user = await UsernModel.create({username, password})
  }

  //校验密码是否正确  须要在用户原型上做操作
 


if (user.comparePassword(password)) {
  // 通过，就可以登录


  //登入成功了就把 auth 加进去  
  //以后就是看有没有这个auth 来判断是否有登录

  // 给 req.session 上添加一个 auth 属性，auth 属性里保存当前用户的ID和username等信息
  // 后续判断用户是否登录，只需要去判断 req.session 中有没有 auth 这个属性即可
  req.session.auth = {
    userId: user._id,
    username: user.username
  };
    // 从 req.session.redirect 中获取要回到的页面地址, 如果获取不到，默认打回首页
    // let redirect = req.session.redirect || "/";
    // // 跳转
    // res.redirect(redirect);

    // console.log(req.originalUrl);
    // res.redirect(req.query.redirect);
    res.send("登录成功")
  } else {
    // 不通过，用户名或密码不正确
    throw new Error("用户名或密码不正确");
  }
});

module.exports = router