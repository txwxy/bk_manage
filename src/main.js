import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss' //全局样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios';
import '../api/mock.js';

// import Router from 'vue-router'

// import { Button, Select, Container, Aside, Header, Main,Menu,Submenu,MenuItem,
//   MenuItemGroup,Dropdown,DropdownMenu,DropdownItem } from 'element-ui';

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.config.productionTip = false 
Vue.use(ElementUI);
// Vue.use(Button)

Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$http=http

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
 
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  //store.commit('getMenu')
  let token = store.state.user.token
  console.log(token)
  // 过滤登录页，因为去登陆页不需要token(防止死循环)
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  }
  else if(token&&to.name==='login'){
    //如果已经登录了但是还在login页面则跳转到home
    next({ path: '/home'})
  
  }
  else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  //刷新不出现白屏
  created(){
    store.commit('addMenu',router)
  }

}).$mount('#app')
