<template>
  <div class="table_div">
    <Input search enter-button="Search" placeholder="请输入订单号" v-model="searchID"
    size="large" autofocus class="search" @on-search='click'/>
    <Table border :columns="columns" :data="data" height='345' no-data-text=''></Table>
  </div>
</template>

<script>

export default {
  data(){
    return {
      searchID:"",
      data:[],
      columns:[
        {title:'订单号',key:'id'},
        {title:'报刊编号',key:'newsID'},
        {title:'报刊名称',key:'newsName'},
        {title:'收件人姓名',key:'userName',},
        {title:'收货地址',key:'address'},
        {title:'邮政编码',key:'postCode'},
        {title:'订报时间',key:'time'}
      ]
    }
  },
  methods:{
    async click(){
      if(this.searchID==''){
        this.$Message.warning({
          background: true,
          content: '请 输 入 订 单 号 !'
        })
        return;
      }
      const {data:resdata} = await this.$axios.post('/search',{id:this.searchID})
      if(resdata.data.length==0){
        this.$Message.error({
          background: true,
          content: '查 无 此 订 单 号 !'
        })
        return;
      }
      this.data = resdata.data
      for(let i in this.data){
        this.data[i].time = this.data[i].time.split('T')[0]
      }
    }
  }
}
</script>

<style scoped>
.table_div{
  width: 83%;
  position: relative;
  left: 8%;
  padding: 0 15px;
  text-align: center;
}
.search{
  width: 50%;
  margin: 30px;
  position: relative;
  left: 20%;
}
</style>