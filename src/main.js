/**
 * @name: duanmengjie
 * @email: 229275085@qq.com
 * @date: 2018-04-20
 */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI,Vuex);

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
