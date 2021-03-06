import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Worker from '../views/WorkerLogin.vue'
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
import StaffHome from '../views/StaffHome.vue'
import Address from '../views/PostAddress.vue'
import Order from '../views/Order.vue'
import StaffAdd from '../views/StaffAdd.vue'
import StaffAccount from '../views/StaffAccount.vue'
import Stock from '../views/StaffStock.vue'

const routes = [{
    path: '/worker',
    name: 'Worker',
    component: Worker,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("token");
      if (login && role === "Admin") {
        next("/adminHome");
      } else if (login && role === "Staff") {
        next("/staffHome");
      } else {
        next();
      }
    }
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: AdminHome
  },
  {
    path: '/addAccount',
    name: 'AddAccount',
    component: RegisStaff
  },
  {
    path: '/accountAdmin',
    name: 'AccountAdmin',
    component: AccountAdmin
  },

  //staff
  {
    path: '/staffHome',
    name: 'staffHome',
    component: StaffHome
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: StaffAdd
  },
  {
    path: '/staffAccount',
    name: 'staffAccount',
    component: StaffAccount
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock
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
    component: Account,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("token");
      if (!login && role != "Customer") {
        next("/login");
      } else if (role === "Staff" || role === "Admin") {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    props: true,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("token");
      if (!login && role != "Customer") {
        next("/login");
      } else if (role === "Staff" || role === "Admin") {
        next("/login");
      } else {
        next();
      }
    }
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
    component: Login,
  },
  {
    path: '/addAddress',
    name: 'Address',
    component: Address,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const login = localStorage.getItem("token");
      if (role === "Staff" || role === "Admin") {
        next("/login");
      }else if(!login && role != "Customer"){
        next("/login")
      } else {
        next();
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router