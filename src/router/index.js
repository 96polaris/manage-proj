
import manageLogin from '../components/manageLogin.vue'
import manage from '../components/manage.vue'


export const routes=[
  {path:'/',name:'manageLogin',component:manageLogin},
  {path:'/manage',component:manage,
    beforeEnter:(to,from,next)=>{
      console.log(from.name);
      if(from.name=='manageLogin'){
        next()
      }else{
        alert('请登录后查看')
        next({path: '/'})

      }

}},
  ]

