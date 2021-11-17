import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import NavAdmin from '@/components/NavAdmin.vue'
import AddStaff from '@/components/AddStaffButtom.vue'
import EditProfile from '@/components/EditProfile.vue'
import CusNav from '@/components/NavCus.vue'
import NavProduct from '@/components/NavProduct.vue'
import PopUp from '@/components/PopUp.vue'


const app = createApp(App).use(router)
app.component('navAdmin', NavAdmin)
app.component('addStaff', AddStaff)
app.component('edit', EditProfile)
app.component('md-icon', MenuIcon)
app.component('navbar', CusNav);
app.component('navProduct', NavProduct)
app.component('popup', PopUp)
app.mount('#app')