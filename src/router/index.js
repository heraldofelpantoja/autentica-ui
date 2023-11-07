import { createRouter, createWebHistory } from 'vue-router'
import GrupoView from '../views/groups/GrupoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: GrupoView
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/groups/GrupoForm.vue')
  },
  {
    path: '/permissao',
    name: 'permissao',
    component: () => import('../views/permission/PermissionView.vue'),
  },
  {
    path: '/permissao-form',
    name: 'permissao-form',
    component: () => import('../views/permission/PermissionForm.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
