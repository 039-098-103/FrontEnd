import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'
import RegisStaff from '../views/RegisStaff.vue'
import AccountAdmin from '../views/AccountAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/adminHome',
    name: '/adminHome',
    component: AdminHome
  },
  {
    path: '/register',
    name: '/register',
    component: RegisStaff
  },
  {
    path: '/accountAdmin',
    name: '/accountAdmin',
    component: AccountAdmin
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
