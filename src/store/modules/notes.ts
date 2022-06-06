import { db } from '@/firebase/firebase-config';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Notes, Note } from "../types"
import { loadNotes } from '@/helpers/loadNotes'
import { fileUpload } from '@/helpers/fileUpload';

const state: Notes = {
  notes: [],
  active: <Note>{}
}

const mutations: MutationTree<Notes> = {
  activeNote: (state, payload) => {
    state.active = payload
  },
  setNotes: (state, payload) => {
    state.notes = payload
  },
  deleteNote: (state, id) => {
    state.notes = state.notes.filter((note: Note) => note.id !== id)
    state.active = <Note>{}
  },
  updateNotes: (state, payload) => {
    state.notes = [payload, ...state.notes]
  },
  cleanNotes: (state) => {
    state.notes = []
    state.active = <Note>{}
  }
}

const actions: ActionTree<Notes, any> = {
  startNewNote: async ({commit, rootState}) => {
    const { uid } = rootState.auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      url: ''
    }

    const doc = await db.collection(`${uid}/journal/notes`).add( newNote )
    const payload = {
      id: doc.id,
      ...newNote
    }
    commit('activeNote', payload)
    commit('updateNotes', payload)
  },
  setNotes: async ({commit}, uid) => {
    const notes = await loadNotes(uid)
    commit('setNotes', notes)
  },
  startDeleting: async ({commit, rootState}, id) => {
    const uid = rootState.auth.uid
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    commit('deleteNote', id)
  },
  startUploadingPicture: async ({rootState}, file) => {
    const { active } = rootState.notes
    const { uid } = rootState.auth
    const fileUrl = await fileUpload(file)
    active.url = fileUrl
    const noteToFirestore = { ...active };
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${active.id}`).update(noteToFirestore);
  }
}

const getters: GetterTree<Notes, any> = {
  isEmptyActive: (state) => {
    return Object.keys(state.active).length == 0
  }
} 

export const notes = {
  state,
  actions, 
  mutations,
  getters
}