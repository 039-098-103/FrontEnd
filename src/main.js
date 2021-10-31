import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import NavAdmin from '@/components/admin/NavAdmin.vue'
import AddStaff from '@/components/admin/AddStaffButtom.vue'
import EditProfile from '@/components/admin/EditProfile.vue'




const app = createApp(App).use(router)
app.component('navAdmin', NavAdmin)
app.component('addStaff', AddStaff)
app.component('edit', EditProfile)
app.component('md-icon', MenuIcon);
app.mount('#app')