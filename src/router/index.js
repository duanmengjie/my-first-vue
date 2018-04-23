import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: r => require.ensure([], () => r(require('../components/home')), 'home'),
    redirect: '/Record',
    children: [{
      path: '/Record',
      component: r => require.ensure([], () => r(require('../pages/record/record')), 'record')
    }]
  }]
})
