import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/choose',
    name: 'Choose',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Choose.vue')
    }
  },
  {
    path: '/solutions/:id',
    name: 'Solutions',
    params: true,
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Solutions.vue')
    }
  },
  {
    path: '/single-solution/:id',
    name: 'SingleSolution',
    params: true,
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SingleSolution.vue')
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
