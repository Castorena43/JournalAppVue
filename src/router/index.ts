import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
import { useStore } from 'vuex'
import { firebase } from '@/firebase/firebase-config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/auth/LoginComponent.vue'),
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/auth/RegisterComponent.vue'),
    meta: { auth: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  // if (store.state.auth.uid === '') {
  //   firebase.auth().onAuthStateChanged( async (user) => {
  //     console.log(user)
  //     if (user?.uid) {
  //       store.commit(
  //         'login',
  //         {
  //           uid: user.uid,
  //           name: user.displayName
  //         }
  //       )
  //       router.push('/')
  //     }
  //   })
  // }
  const requiresAuth = to.matched.some(route => route.meta.auth)
  // console.log(store.getters.isAuthenticated)
  // if (store.getters.isAuthenticated) next({ name: 'home' })
  // else next('login')
  if (requiresAuth) {
    if (store.getters.isAuthenticated) {
      next()
    }
    else next({ name: 'login' })
  } else if (!requiresAuth) {
    if (store.getters.isAuthenticated) {
      next({ path: '/' })
    }
    else next()
  } 

})

export default router
