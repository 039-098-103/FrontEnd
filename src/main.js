import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import NavAdmin from '@/components/admin/NavAdmin.vue'
import Login from '@/components/admin/LoginAdmin.vue'
import AddStaff from '@/components/admin/AddStaffButtom.vue'
import Search from '@/components/admin/Search.vue'

const app = createApp(App).use(router)
app.component('navAdmin', NavAdmin)
app.component('logIn', Login)
app.component('addStaff', AddStaff)
app.component('search', Search)
app.mount('#app')