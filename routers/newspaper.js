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
  res.json('我是购买路由')
})

module.exports = router