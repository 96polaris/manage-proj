
import manageLogin from '../components/manageLogin.vue'
import manage from '../components/manage.vue'


export const routes=[
  {path:'/',component:manageLogin},
  {path:'/manage', component:manage,
    beforeEnter:(to,from,next)=>{
      if(from.name==manageLogin){
        next()
      }else{
        alert('请登录')
        next({path:'/'})
      }
}},
  ]

