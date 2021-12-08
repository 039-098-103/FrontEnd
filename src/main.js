import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import NavAdmin from '@/components/NavAdmin.vue'
import AddStaff from '@/components/AddStaffButtom.vue'
import EditProfile from '@/components/EditProfile.vue'
import CusNav from '@/components/NavCus.vue'
import NavProduct from '@/components/NavProduct.vue'
import Footer from '@/components/Footer.vue'
import Register from '@/components/Register.vue'
import NavStaff from '@/components/NavStaff.vue'
// import Confirm from '@/components/ConfirmPassword.vue'
import EditStaff from '@/components/EditStaff.vue'
import EditCart from '@/components/EditCart.vue'
import EditCus from '@/components/EditCustomer.vue'


const app = createApp(App).use(router)
app.component('navAdmin', NavAdmin)
app.component('addStaff', AddStaff)
app.component('edit', EditProfile)
app.component('navbar', CusNav);
app.component('navProduct', NavProduct)
app.component('Footer', Footer)
app.component('Register', Register)
app.component('navStaff', NavStaff)
app.component('editStaff', EditStaff)
// app.component('confirm', Confirm)
app.component('editCart', EditCart)
app.component('editCus', EditCus)
app.mount('#app')