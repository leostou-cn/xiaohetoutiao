import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  redirect: '/layout/home'
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/loginVue.vue'),
  meta: {
    keepalive: true
  }
}, {
  path: '/search',
  name: 'search',
  component: () => import('@/view/search/searchView.vue'),
  meta: {
    keepalive: true
  }
}, {
  path: '/layout',
  component: () => import('@/view/layout/layoutVue.vue'),
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/view/home/homeVue.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/view/detail/detailView.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: 'user',
    name: 'user',
    component: () => import('@/view/user/userVue.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: 'user_edit',
    name: 'user_edit',
    component: () => import('@/view/user/userEdit/userEditView.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: 'chat',
    name: 'chat',
    component: () => import('@/view/chat/chatView.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: 'scroll',
    name: 'scroll',
    component: () => import('@/view/scroll/scrollView.vue'),
    meta: {
      keepalive: true
    }
  }, {
    path: 'video',
    name: 'video',
    component: () => import('@/view/video/videoView.vue'),
    meta: {
      keepalive: false
    }
  }],
  meta: {
    keepalive: true
  }
}]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})