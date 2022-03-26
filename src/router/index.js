import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [ 
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () => import('@/views/login'),
  //   children:[
  //     {
  //       path:'/home',
  //       name: 'home',
  //       component:()=> import('../views/home/index.vue')
  //     },
  //     {
  //       path:'/user',
  //       name: 'user',
  //       component:()=> import('../views/user/index.vue')
  //     }, 
  //     {
  //       path:'/mall',
  //       name:'mall',
  //       component:()=> import('../views/mall')
  //     },
  //     {
  //       path:'/page1',
  //       name:'page1',
  //       component:()=> import('../views/other/pageOne.vue')
  //     },
  //     {
  //       path:'/page2',
  //       name:'page2',
  //       component:()=> import('../views/other/pageTwo.vue')
  //     },
  //   ]
  // },
  {
    path: '/login',
    name:'login',
    component:()=> import('../views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.selfaddRoutes = function (params){
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher
//   router.addRoutes(params)
// }

export default router
