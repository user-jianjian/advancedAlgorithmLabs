import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/lab1',
    name: 'lab1',
    component: () => import('../views/Lab1View.vue')
  },
  {
    path: '/lab2',
    name: 'lab2',
    component: () => import('../views/Lab2View.vue')
  },
  {
    path: '/lab3',
    name: 'lab3',
    component: () => import('../views/Lab3View.vue')
  },
  {
    path: '/lab4',
    name: 'lab4',
    component: () => import('../views/Lab4View.vue')
  },
  {
    path: '/lab1-compare',
    name: 'lab1Compare',
    component: () => import('../views/Lab1Compare.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
