import { createRouter, createWebHistory } from 'vue-router'
import GrupoView from '../views/groups/GrupoView.vue'
import RoutesName from './routes_name'

const routes = [
  {
    path: RoutesName.HOME_ROUTE,
    name: 'home',
    component: () => import('../views/agenda/AgendaView.vue')
  },
  {
    path: RoutesName.GROUP_ROUTE,
    name: 'grupo',
    component: GrupoView
  },

  {
    path: RoutesName.PERMISSION_ROUTE,
    name: 'permissao',
    component: () => import('../views/permission/PermissionView.vue'),
  },
  {
    path: RoutesName.USER_ROUTE,
    name: 'user',
    component: () => import('../views/user/UserView.vue'),
  },

  {
    path: RoutesName.USER_FORM_ROUTE,
    name: 'user-form',
    component: () => import('../views/user/UserForm.vue'),
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
