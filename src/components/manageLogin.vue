<template>
  <div>
    <div class="login">
      <div>
        <p>
          <span style="font-size: 20px;border: 1px">管理员登录</span>
          <span>
      </span>
        </p>
        <el-radio-group v-model="labelPosition" size="small">
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formLabelAlign.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <!--<router-link to="/resetpwd" style="float: right">忘记密码？</router-link>-->
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "manageLogin",
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          pwd: '',
          type: ''
        }
      }
    },
    methods: {
      submitForm() {
        let _this = this
        axios({
          method: 'post',
          url: 'http://localhost:3000/manage/managelogin',
          data: {
            name: _this.formLabelAlign.name,
            pwd: _this.formLabelAlign.pwd
          }
        }).then(function (result) {
          if (result.data.data != 0) {
            //如果用户登录成功，用户信息保存在sessionStorage中
            sessionStorage.setItem('manageName', result.data.data.manageName)
            alert('登录成功，即将跳转到管理页')
            _this.$router.push({path: '/manage'})

          } else {
            alert('登录失败，用户名或密码错误，请重新登录')
            _this.formLabelAlign.phone = ''
            _this.formLabelAlign.pwd = ''
            _this.$router.push({path: '/'})
          }
        },)

      }
    }
  }

</script>


<style scoped>
  .login {
    background: url("../assets/000fivr7.jpg");
    height: 600px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    position: relative;

  }

  .login > div {
    width: 400px;
    height: 400px;
    position: relative;
    float: right;
    margin: 70px 40px;
    padding: 40px 20px 50px 20px;
    background-color: white;
    opacity: 0.9;
  }

  .login > div > p > span {
    margin-left: 10px;
    margin-right: 100px;
  }
</style>
