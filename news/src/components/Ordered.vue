<template>
  <div class="table_div" v-if="isRouterAlive">
    <h2><Icon type="ios-card" /> 已订报刊详情</h2>
    <Table border :columns="columns" :data="data" class="table" height='345'></Table>
    <Table :columns="Tcolumns" :data="Tdata" :show-header="false" 
    border :span-method="handleSpan" :disabled-hover='true'></Table>
    <div class="btn_div">
      <Button shape="circle" type="error" ghost style="margin:10px;transform:translate(200%);">
        清空已订列表
      </Button>
      <Button shape="circle" type="success" ghost style="margin:10px;transform:translate(250%);">
        支付下单
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  beforeMount(){
    this.data = this.$store.state.newsInfo
  },
  data(){
    return {
      isRouterAlive:true,
      Tdata:[{Tid:'合计',payment:this.$store.state.payment+' 元'}],
      Tcolumns:[
        {key:'Tid',align:'center'},
        {key:'payment',align:'center'},
        {},{},{},{},{}
      ],
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
        {title:'订购数量',key:'number'},
        {
          title:' ',key:'delete',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {type: 'primary'},
                on: {
                  click: () => {
                    this.$Message.warning({
                      background: true,
                      content: '已将 '+params.row.name+' 移除已订报刊'
                    });
                    this.$store.commit('delNewsInfo',params.row)
                    this.reLoad()
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    }
  },
  methods:{
    handleSpan({ row, column, rowIndex, columnIndex }){
      if(columnIndex==1) return [1,6]
    },
    reLoad(){
      this.reload()
    }
  }
}
</script>

<style scoped>
.btn_div{
  position: relative;
  padding-left: 52%;
  padding-top:10px;
}
.table_div{
  width: 83%;
  position: relative;
  left: 8%;
  padding: 0 15px;
}
h2{
text-align: center;
margin: 15px 0;
}
</style>