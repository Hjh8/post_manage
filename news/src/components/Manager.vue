<template>
  <div>
    <div v-if="flag">
      <div id="manager" style="width: 1100px;height:500px;margin:15px;">
      </div>
      <div class="salesment">
        <Card>
          <Tag color="purple" size='large' style="width:150px;text-align:center">
            月 销 售 量：{{sales.Mpaymeny}} 元
          </Tag>
          <Divider style="width:100px"><Icon type="ios-planet-outline" /></Divider>
          <Tag color="gold" size='large' style="width:150px;text-align:center">
            月 销 售 额：{{sales['Msalenum']}} 份 
          </Tag>
        </Card>
      </div>
    </div>
    <div v-else>
      <h1 style="text-align:center;top:20px;">
        本月报刊暂无销售记录
      </h1>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data(){
    return {
      flag:true,//如果本月无销售就不显示
      //存放月销售额跟销售量
      sales:{},
      option: {
        title:{
          text:'销售前十出版社',
          subtext:'饼图实例',
          left:'center',
          top:10,
          textStyle:{ color:'#ccc'}
        },
        // 弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}:{c} ({d}%)'
        },
        // 图例
        legend: {
          orient: 'vertical',
          left: 10,
          data: []
        },
        // 数据
        series: [
          {
            name: '销售前三出版社',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: true
            },
            data: []
          },
          {
            name: '月销售量',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              shadowBlur:3,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowColor: '#999',
              padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: []
          }
        ]
      }
    }
  },
  mounted(){
    // 必须在DOM被渲染完毕时才可以初始化图表
    this.initEchart()
  },
  methods:{
    async initEchart(){
      const {data:resdata} = await this.$axios.get('/sales')
      if(!resdata){
        this.flag = false
      }
      // 存入月销售量跟销售额
      this.sales = resdata.sales[0]

      // 将前十的报刊名称作为图例
      for(let i of resdata.newsData){
        this.option.legend.data.push(i.name)
        this.option.series[1].data.push(i)
      }
      let j = 0;
      for(let i of resdata.unitData){
        if(j++==1) {
          i.selected = true;
        }
        this.option.series[0].data.push(i)
      }
      let myChart = echarts.init(document.getElementById('manager'));
      myChart.setOption(this.option,true);
    }
  }
}
</script>

<style>
.salesment{
  background: #000;
  position: absolute;
  right: 7.5%;
  top:20%;
}
</style>