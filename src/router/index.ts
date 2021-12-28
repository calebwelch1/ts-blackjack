import Vue from 'vue'
import VueRouter from 'vue-router'
// import Landing from '../pages/Landing/index.vue'
import HomeRouter from '../pages/Router.vue'

Vue.use(VueRouter)
// how to route in a page
{/* <router-link to="/about">About</router-link> */}


const routes = [
  // {
  //   path: '/',
  //   name: 'Landing',
  //   component: Landing,
  // },
  {
    path: '/',
    name: 'Landing',
    component: HomeRouter,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
