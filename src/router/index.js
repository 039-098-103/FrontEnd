import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'
import RegisStaff from '../views/RegisStaff.vue'
import AccountAdmin from '../views/AdminAccount.vue'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import New from '../views/NewCollec.vue'
import LookBook from '../views/LookBook.vue'
import Account from '../views/Account.vue'
import Cart from '../views/Cart.vue'
import All from '../views/AllProduct.vue'
import Preview from '../views/Preview.vue'
import Login from '../views/Login.vue'

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
    name: 'Home',
    component: Home
  },
  {
    path: '/developTeam',
    name: 'Develop',
    component: Team
  },
  {
    path: '/newCollection',
    name: 'NewCollection',
    component: New
  },
  {
    path: '/lookbook',
    name: 'LookBook',
    component: LookBook
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/allProduct',
    name: 'AllProduct',
    component: All
  },
  {
    path: '/preview/:productId',
    name: 'productPreview',
    component: Preview,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
