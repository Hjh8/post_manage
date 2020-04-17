import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    newsInfo:[],
    payment:0,
    totalNum:0,
    isDrawer:false,
    isDialog:false
  },
  mutations: {
    setIsDrawer(state){
      state.isDrawer = !state.isDrawer
    },
    setDialog(state){
      state.isDialog = !state.isDialog
    },
    setNewsInfo(state,news){
      // 增加已订报刊
      state.newsInfo.push(news)
      // 计算数量
      state.totalNum += news.number
      // 计算总价
      state.payment += parseFloat((parseFloat(news.price)*news.number).toFixed(2))
    },
    setUserInfo(state,user){
      state.userInfo = user
      state.userInfo.payment = state.payment
    },
    delNewsInfo(state,delNews){
      for(let i in state.newsInfo){
        if(state.newsInfo[i].id == delNews.id){
          // 更新数量
          state.totalNum -= state.newsInfo[i].number
          // 更新总价
          state.payment -= parseFloat((parseFloat(state.newsInfo[i].price)*state.newsInfo[i].number).toFixed(2))
          // 删除报刊
          state.newsInfo.splice(i,1)
        }
      }
    },
    clear(state){
      // 清空已购表格
      state.newsInfo = []
      state.number = 0
      state.payment = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
