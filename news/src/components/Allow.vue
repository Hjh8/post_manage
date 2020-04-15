<template>
  <div class="table_div">
    <h2><Icon type="ios-bookmarks-outline" /> 可订报刊详情</h2>
    <Table border :columns="columns" :data="data" class="table" height='445'></Table>
    <br>
    <b>
      共订阅了{{this.$store.state.totalNum}}份报刊,
      总金额：{{this.$store.state.payment}} 元
    </b>
  </div>
</template>

<script>
export default {
  async beforeMount(){
    const {data:resdata} = await this.$axios.get('newsInfo')
    this.data = resdata.data
  },
  data(){
    return {
      data:[],
      columns:[
        {title:'报刊编号',key:'id'},
        {title:'报刊名称',key:'name'},
        {title:'报刊单价(元/份)',key:'price'},
        {
          title:'报刊类型',
          key:'type',
          filters: [
            {label: '日报',value:'日报'},
            {label: '周刊',value:'周刊'},
            {label: '旬刊',value:'旬刊'},
            {label: '半月刊',value:'半月刊'},
            {label: '月刊',value:'月刊'},
            {label: '双月刊',value:'双月刊'},
            {label: '季刊',value:'季刊'},
          ],
          filterMultiple: false,
          filterMethod(value, row) {return row.type == value}
        },
        {title:'版面规格(cm)',key:'standard'},
        {title:'出版单位',key:'unit'},
        {
          title:'订购数量',
          key:'number',
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                props: {min: 0,value:0,size:'small'},
                on: {
                  'on-change': e => {
                    if(e!=null){
                      params.row.number = e;
                    }
                  }
                }
              }),
            ]);
          }
        },
        {
          title:'是否预订',
          key:'order',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {type: 'primary'},
                on: {
                  click: () => {
                    if(typeof(params.row.number)=='undefined'){
                      this.$Message.error({
                        background: true,
                        content: '请选择需要订阅报刊的数量'
                      });
                    }else{
                      this.$Message.success({
                        background: true,
                        content: '已将 '+params.row.name+' 加入已订报刊'
                      });
                      this.$store.commit('setNewsInfo',params.row)
                    }
                  }
                }
              }, '订阅')
            ]);
          }
        }
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.table_div{
  width: 83%;
  position: relative;
  left: 8%;
  padding: 0 15px;
}
b{
  margin: 0;
  padding: 0;
}
h2{
text-align: center;
margin: 15px 0;
}
</style>