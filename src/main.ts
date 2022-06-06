import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/main.scss'
import { firebase } from '@/firebase/firebase-config'

let app: any

firebase.auth().onAuthStateChanged( async (user) => {
  if (user?.uid) {
    store.commit(
      'login',
      {
        uid: user.uid,
        name: user.displayName
      }
    )
  }
  if (!app) {
    createApp(App).use(store).use(router).mount('#app')
  }
})


