import { createStore } from 'vuex'
import { auth } from './modules/auth'
import { notes } from './modules/notes'
import { ui } from './modules/ui'

export default createStore({
  modules: {
    auth,
    ui,
    notes
  }
})
