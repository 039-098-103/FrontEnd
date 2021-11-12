import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'
import RegisStaff from '../views/RegisStaff.vue'
import AccountAdmin from '../views/AdminAccount.vue'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'

const routes = [
  {
    path: '/adminLogin',
    name: '/AdminLogin',
    component: AdminLogin
  },
  {
    path: '/adminHome',
    name: '/adminHome',
    component: AdminHome
  },
  {
    path: '/addAccount',
    name: '/addAccount',
    component: RegisStaff
  },
  {
    path: '/accountAdmin',
    name: '/accountAdmin',
    component: AccountAdmin
  },

  // customer
  {
    path: '/',
    name: '/Home',
    component: Home
  },
  {
    path: '/developTeam',
    name: 'Develop',
    component: Team
  }
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: AccountAdmin
  // },
  // {
  //   path: '/accountAdmin',
  //   name: '/accountAdmin',
  //   component: AccountAdmin
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
