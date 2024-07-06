import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import App from './App.vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Login from './pages/Login.vue'
import UserAccount from './pages/UserAccount.vue'
import SignUp from './pages/SignUp.vue'
import AdminPanel from './pages/AdminPanel.vue'

const app = createApp(App)
const pinia = createPinia();

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/user_account', name: 'UserAccount', component: UserAccount },
  { path: '/admin_panel', name: 'AdminPanel', component: AdminPanel }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(pinia);
app.use(router)
app.mount('#app')
