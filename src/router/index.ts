import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  redirect: '/layout'
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/loginVue.vue')
}, {
  path: '/search',
  name: 'search',
  component: () => import('@/view/search/searchView.vue')
}, {
  path: '/detail/:id',
  name: 'detail',
  component: () => import('@/view/detail/detailView.vue')
}, {
  path: '/layout',
  component: () => import('@/view/layout/layoutVue.vue'),
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/view/home/homeVue.vue')
  }, {
    path: 'user',
    name: 'user',
    component: () => import('@/view/user/userVue.vue')
  }, {
    path: 'user_edit',
    name: 'user_edit',
    component: () => import('@/view/user/userEdit/userEditView.vue')
  }]
}]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})