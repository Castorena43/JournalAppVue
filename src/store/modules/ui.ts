import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { UI } from "../types"

const state: UI = {
  loading: '',
  msgError: ''
}

const getters: GetterTree<UI, any> = {
  getError: (state) => {
    return state.msgError
  }
}

const mutations: MutationTree<UI> = {
  setError: (state, payload) => {
    state.msgError = payload
  },
  removeError: (state) => {
    state.msgError = ''
  }
}

const actions: ActionTree<UI, any> = {

}

export const ui = {
  state,
  actions, 
  mutations,
  getters
}