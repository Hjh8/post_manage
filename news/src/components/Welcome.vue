<template>
  <div>
    <div class="welcome_div">
      <!-- 动态显示时间 -->
      <span class="time_span">
        {{hh +":"+ mm}}
      </span>
      <span class="date_span">
        {{month+'-'+day}}
      </span>
      <br>
      <span class="goodMAE_span">
        <span v-if="6<=hh && hh<12">GoodMorning</span>
        <span v-else-if="12<=hh && hh<17">GoodAfternoon</span>
        <span v-else>GoodEvening</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.getLocalTime()
  },
  data(){
    return{
      hh : "",
      mm : "",
      month:'',
      day:''
    }
  },
  methods:{
    getLocalTime(){
      this.hh = new Date().getHours()
      this.mm = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes()
      this.day = new Date().getDate()
      this.month = new Date().getMonth() + 1
    }
  },
  mounted(){
    setInterval(() => this.getLocalTime() ,1000)
  }
}
</script>

<style scoped>
.welcome_div{
  position: absolute;
  top:28%;
  left: 40%;
  text-align: center;
}
.time_span{
  font-size: 1050%;
  text-align: center;
  padding: 0;
  margin: 0;
}
.goodMAE_span{
  text-align: left;
  font-size: 337.5%;
  position: absolute;
  left: 10%;
}
.date_span{
  font-size: 200%;
  padding: 0;
  margin: 0;
}
</style>