import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SostEasy from '../views/SostEasy.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: HomePage
  }, {
    path: '/newsostfac',
    name: 'Nuovo esercizio easy',
    component: SostEasy
  }, {
    path: '/newsostdif',
    name: 'Nuovo esercizio diff',
    component: HomePage
  }, {
    path: '/newadj',
    name: 'Nuovo esercizio adj',
    component: HomePage
  }, {
    path: '/newconj',
    name: 'Nuovo esercizio conj',
    component: HomePage
  }, {
    path: '/newflash',
    name: 'Nuovo eserеcizio flash',
    component: HomePage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
