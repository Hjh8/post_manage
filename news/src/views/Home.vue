<template>
  <div class="layout">
    <Layout style="width:100%;height:100%;">
      <Header>
        <div class="layout-logo">
          <Icon type="md-ionitron" />
          邮 局 订 报 系 统
          <Icon type="ios-megaphone-outline" />
        </div>
      </Header>
      <Layout :style="{padding: '0 50px',width:'100%',height:'100%'}">
        <Button type="text" class="title_btn" @click="goHome('/welcome')">
          <Icon type="md-paper" />
          欢 迎 使 用 邮 局 订 报 系 统
        </Button>
        <Content class="home_content">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu theme="light" width="auto" style="height:100%;">
                  <MenuItem name="allow" to='/可订报刊' style="font-size:15px;">
                    <Icon type="ios-bookmarks-outline" />可订报刊
                  </MenuItem>
                  <MenuItem name="ordered" to='/已订报刊' style="font-size:15px;">
                    <Icon type="ios-card" />已订报刊
                  </MenuItem>
                  <MenuItem name="find" to='/查询订单' style="font-size:15px;">
                    <Icon type="ios-search" />查询订单
                  </MenuItem>
                  <MenuItem name="sales" to='/报刊售况' style="font-size:15px;">
                    <Icon type="md-analytics" />报刊售况
                  </MenuItem>
              </Menu>
            </Sider>
            <Content :style="{background: '#fff'}">
              <router-view v-if="isRouterAlive"/>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">1999-2020 &copy; CodeKiang</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  //提供一个依赖
  provide(){
    return {
      reload:this.goHome
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    goHome(path){
      // 刷新已订报刊的路由时不需要传递path
      if(typeof(path)!=='undefined') this.$router.push(path)
      /**
       * 实现无短暂白页面刷新路由功能
       */
      this.isRouterAlive = false
      //Dom刷新之前会执行此函数
      this.$nextTick(()=>{this.isRouterAlive = true })
    },
  }
}
</script>

<style scoped>
.home_content{
  padding: 20px 0;
  width:100%;
  height:'100%';
  background: #fff;
}
.title_btn{
  position: relative;
  margin-top: 10px;
  padding-left: 0;
  width: 14%;
  font-size: 15px;
}
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width:100%;
  height:100%;
}
.layout-logo{
  width:100%;
  height:100%;
  border-radius: 3px;
  float: left;
  position: relative;
  color: aliceblue;
  font-size: 25px;
  text-align: center;
}
.layout-footer-center{
    text-align: center;
}
</style>