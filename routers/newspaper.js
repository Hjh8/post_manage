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
  const news_list = req.body.newsInfo
  const sql_user = 'insert into user value (?,?,?,?,?,?,current_timestamp);'
  const sql_news = 'insert into purchase value ?;'

  const params_user = [
    user.id,user.name,user.phone,
    user.address,user.code,user.payment,
  ]
  const params_news = []
  for(let news of news_list){
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

router.get('/sales',(req,res) => {
  const sql_news = 'select name,salesnumber as value from sales_ranking ORDER BY salesNumber DESC LIMIT 0,10;'
  const sql_unit = `select unit as name,sum(salesNumber) as value
                    from sales_ranking
                    GROUP BY unit
                    ORDER BY sum(salesNumber) DESC
                    LIMIT 0,3;`
  conn.query(sql_news,(err1,result1)=>{
    if(err1) throw err1
    conn.query(sql_unit,(err2,result2) => {
      if(err2) throw err2
      const sql3 = 'select * from monthly_sales'
      conn.query(sql3,(err3,result3) => {
        res.json({newsData:result1,unitData:result2,sales:result3})
      })
    })
  })
})

/**
 * 如果需要增加每年、每月、每日销售额可以参考此sql语句
 *  select year(time),month(time),day(time),
    count(id) 
    from order_detail
    group by year(time),month(time),day(time)
 */
module.exports = router