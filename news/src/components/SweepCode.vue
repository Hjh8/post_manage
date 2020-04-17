<template>
  <div>
    <Modal :value="true"
    :styles="{top: '30%'}"
    title="支付页面" cancel-text=' '
    :loading="true" @on-ok="asyncOK">
        <b>
          <p style="color:red;"> 支付成功！</p><br>
          <p style="color:rgb(5, 5, 5);">
            订单号为：{{this.$store.state.userInfo.id}}
          </p><br>
          <p style="color:rgb(5, 5, 5);"> 请妥善保存！</p><br>
        </b>
    </Modal>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  methods: {
    async asyncOK () {
      // 向后端发送数据
      const {data:resdata} = await this.$axios.post('/purchase',{
        userInfo:this.$store.state.userInfo,
        newsInfo:this.$store.state.newsInfo
      })
      if(resdata.status!=200){
        this.$Message.error({
          background: true,
          content: '信息存储失败，请与管理员联系'
        })
      }
      // 清空已购表格的内容
      this.$store.commit('clear')
      this.reload()
      // 关闭对话框
      setTimeout(() => {
        this.$store.commit('setDialog')
      }, 2000);
    }
  }
}
</script>

<style>
.m{
  color: rgb(5, 5, 5);
}
</style>