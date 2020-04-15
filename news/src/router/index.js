import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('views/Home.vue')
const Welcome = ()=> import('components/Welcome.vue')
const ordered = ()=>import('components/Ordered.vue')
const allow = ()=>import('components/Allow.vue')
const find = () => import('components/Find.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:'',
        redirect:'/welcome'
      },
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/可订报刊',
        component:allow
      },
      {
        path:'/已订报刊',
        component:ordered
      },
      {
        path:'/查询订单',
        component:find
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
