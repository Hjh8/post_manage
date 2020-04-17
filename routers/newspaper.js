const express = require('express')
const mysql = require('mysql')

const router = express.Router()

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '5642818',
  database : 'post_manage'
})

router.get('/newsInfo',(req,res) => {
  const sql = 'select * from newspaper;'
  conn.query(sql,(err,result)=>{
    if(err) throw err
    res.json({data:result})
  })
})

router.post('/purchase',(req,res)=>{
  const user = req.body.userInfo
  const news = req.body.newsInfo
  const sql_user = 'insert into user value (?,?,?,?,?,?,current_timestamp);'
  const sql_news = 'insert into purchase value ?;'

  const params_user = [
    user.id,user.name,user.phone,
    user.address,user.code,user.payment,
  ]
  const params_news = []
  for(let news of req.body.newsInfo){
    params_news.push([user.id,news.id,news.price,news.number])
  }
  
  conn.query(sql_user,params_user,(err)=>{
    if(err) throw err
    conn.query(sql_news,[params_news],(err)=>{
      if(err) throw err
      res.json({status:200,message:'成功'})
    })
  })
})

router.post('/search',(req,res) => {
  const sql = 'select * from order_detail where id=?;'
  conn.query(sql,[req.body.id],(err,result)=>{
    if(err) throw err
    res.json({data:result})
  })
})

module.exports = router