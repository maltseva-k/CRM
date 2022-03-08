import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/compat/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login')
    },
    {
      name: 'register',
      path: '/register',
      meta: { layout: 'empty' },
      component: () => import('../views/Register')
    },
    {
      name: 'categories',
      path: '/categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories')
    },
    {
      name: 'detailRecord',
      path: '/detail/:cid/:id',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/DetailRecord')
    },
    {
      name: 'history',
      path: '/history',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History')
    },
    {
      name: 'profile',
      path: '/profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile')
    },
    {
      name: 'planning',
      path: '/planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planing')
    },
    {
      name: 'record',
      path: '/record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Record')
    },
    {
      name: 'main',
      path: '/',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Home')
    },
    {
      path: '*',
      // redirect: '/'
      meta: { layout: 'empty' },
      component: () => import('../views/PageNotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  // const requireAuth = to.matched.some(record => (record.meta).auth)

  if (to.meta.auth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
