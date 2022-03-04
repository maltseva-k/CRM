import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/compat/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      meta: { layout: 'empty' },
      component: () => import('../views/CRM/Login')
    },
    {
      path: '/register',
      meta: { layout: 'empty' },
      component: () => import('../views/CRM/Register')
    },
    {
      path: '/categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/Categories')
    },
    {
      path: '/detail/:cid/:id',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/DetailRecord')
    },
    {
      path: '/history',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/History')
    },
    {
      path: '/profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/Profile')
    },
    {
      path: '/planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/Planing')
    },
    {
      path: '/record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/Record')
    },
    {
      path: '/',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/CRM/Home')
    },
    {
      path: '*',
      // redirect: '/'
      meta: { layout: 'empty' },
      component: () => import('../views/CRM/PageNotFound')
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
