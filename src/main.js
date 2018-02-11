import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'

import './styles/main.scss'
// import Mock from './mock'

import utils from './common/js/util.js'

import 'font-awesome/css/font-awesome.min.css'

window.storeLocal = utils.storeLocal;
window.storeSession = utils.storeSession;

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

// Mock.bootstrap();
NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  // let user = JSON.parse(sessionStorage.getItem('user'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next();
})

router.afterEach(transition => {
  NProgress.done();
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

