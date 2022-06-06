import { ActionTree, GetterTree, MutationTree } from 'vuex';
import Swal from 'sweetalert2'
import { Auth } from "../types"
import { firebase } from '../../firebase/firebase-config'
import router from '@/router';

const state: Auth = {
  uid: '',
  name: ''
}

const getters: GetterTree<Auth, any> = {
  isAuthenticated: (state) => {
    return state.uid !== ''
  }
}

const mutations: MutationTree<Auth> = {
  login: (state, { uid, name }) => {
    state.uid = uid
    state.name = name
  },
  logout: (state) => {
    state.name = ''
    state.uid = ''
  }
}

const actions: ActionTree<Auth, any> = {
  startRegister: ({ commit }, { email, password, name }) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
      .then( async ({ user }: any) => {
        await user.updateProfile({ displayName: name})
        commit(
          'login',
          {
            uid: user.uid,
            name: user.displayName
          }
        )
        router.push('/')
      })
      .catch( (e: any) => {
        Swal.fire('Error', e.message, 'error')
      })
  },
  startLogin: ({ commit }, { email, password }) => {
    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({user}: any) => {
        commit(
          'login',
          {
            uid: user.uid,
            name: user.displayName
          }
        )
        router.push('/')
      })
      .catch((e: any) => {
        Swal.fire('Error', e.message, 'error')
      })
  },
  startLogout: async ({ commit }) => {
    await firebase.auth().signOut()
    commit('logout')
    commit('cleanNotes')
  }
}

export const auth = {
  state,
  getters,
  actions, 
  mutations
}

