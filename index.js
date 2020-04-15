const express = require('express')
const bodyparser = require("body-parser")

const app = express()

// 解决跨域问题
app.all('/*', function(req, res, next) {
  // 允许的跨域的域名
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  // 允许跨域请求携带的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  // 允许跨域的方法
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  
  if (req.method == 'OPTIONS') res.send(200)
  else next() /*让options请求快速返回*/ 
})

// 使用body-parser中间件 （需要放在路由配置之前！）
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

const newspaper = require("./routers/newspaper")
app.use(newspaper)

app.listen(3000,()=>{
  console.log('服务器正在开启')
})