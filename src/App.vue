<template>
  <div>
    <h1>管理员页面</h1>
    <!--<router-link to="/manageLogin">去登陆</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import manageLogin from './components/manageLogin.vue'

  import manage from './components/manage.vue'
export default {
  name: 'App',
  data(){
    return{
      }
    },
  methods:{
    toLogin(){
      app.$router.push({path:'/manageLogin'})
    }
  },
  components:{
    'manage-login':manageLogin,
    'manage-index':manage,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
