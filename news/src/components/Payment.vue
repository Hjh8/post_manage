<template>
  <div class="pay_div">
    <div style="margin:20px;padding-left:20px;padding-top:20px;">
      <h2><Icon type="md-cart"/> 填写收货地址</h2>
    </div>
    <Divider />
    <Form ref="formRef" class="form" label-colon
      :model="userInfo" :rules="ruleValidate" :label-width="150">
      <b>
        <FormItem label="姓名" prop="name">
          <Input type="text" v-model="userInfo.name" :autofocus='true'/>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input type="text" v-model="userInfo.phone"/>
        </FormItem>
        <FormItem label="住址" prop="address">
            <v-distpicker province="省" city="市" area="区" @selected="onSelected"/>
            <Input type="text" v-model="userInfo.address" placeholder="具体详细地址"/>
        </FormItem>
        <FormItem label="邮政编码" prop="code">
            <Input type="text" v-model="userInfo.code"/>
        </FormItem>
        <FormItem class="btn">
            <Button type="success" @click="successPay">确定</Button>
            <Button style="margin-left: 15px" @click="handleReset">清空</Button>
        </FormItem>
      </b>
    </Form>
    <Divider />
    <h4 style="text-align:center;">Thank You!</h4>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  data(){
    const validatephone = (rule, value, callback) => {
      if(!(/^1[3456789]\d{9}$/.test(this.userInfo.phone))){ 
        callback(new Error("请输入正确的手机号"));  
      }
      callback();
    };
    const validateAddress =(rule, value, callback)=>{
      if(!this.isAddress) callback(new Error('请选择地址'))
      callback()
    };
    return {
      address:"",
      isAddress:false,
      userInfo:{
        name:'',
        phone:'',
        address:'',
        code:'',
        id:''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
            { validator: validatephone, trigger: 'blur' }
        ],
        address: [
            { required: true, message: '地址不能为空', trigger: 'blur' },
            { validator: validateAddress, trigger: 'blur' }
        ],
        code: [
            { required: true, message: '邮政编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: { VDistpicker },
  methods:{
    handleReset () {
      this.$refs.formRef.resetFields();
    },
    successPay(){
      this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$Message.success({
              background: true,
              content: '成 功 支 付 !'
            })
            // 生成订单号
            this.userInfo.id = this.random_No()
            this.userInfo.address = this.address + this.userInfo.address
            // 存储用户信息
            this.$store.commit('setUserInfo',this.userInfo)
            // 关闭抽屉
            this.$store.commit('setIsDrawer')
            // 打开支付对话框
            this.$store.commit('setDialog')
          } else {
            this.$Message.error({
              background: true,
              content: '请 填 写 好 用 户 信 息 !'
            })
          }
      })
    },
    onSelected(data){
      this.isAddress = true
      let province = data.province.value
      let city = data.city.value
      let country = data.area.value
      this.address += province + city + country
    },
    random_No() {
      let random_no = "";
      for (let i = 0; i < 5; i++)
      {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = ((new Date().getTime())/2).toFixed() + random_no;
      return random_no;
    }
  }
}
</script>

<style>
.form{
  padding: 30px 50px 30px 0px;
  background:rgba(221, 241, 201, 0.171);
}
.pay_div{
  height:90%;
  padding: 0;
  margin: 0;
}
.btn{
  margin-top:35px;
  margin-bottom:50px;
}
</style>