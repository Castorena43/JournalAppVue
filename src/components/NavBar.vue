<template>
  <aside class="journal__sidebar">
    <div class="journal__sidebar-navbar">
      <h3>
        <i class='far fa-moon'></i>
        <span>Hector</span>
      </h3>
      <button class="btn" @click="logout">
        Logout
      </button>
    </div>
    <div class='journal__new-entry' @click="newNote">
      <i class='far fa-calendar-plus fa-5x'></i>
      <p class='mt-5'>
        New entry
      </p>
    </div>
    <div class='journal__entries'>
      <JournalEntry v-for="note of notes" :note="note" :key="note.id"/>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import JournalEntry from "./journal/JournalEntry.vue";

export default defineComponent({
  components: { JournalEntry },
  computed: {
    ...mapState({
      notes: (state: any) => state.notes.notes,
      uid: (state: any) => state.auth.uid
    })
  },
  methods: {
    ...mapActions(['setNotes','startNewNote','startLogout']),
    newNote () {
      this.startNewNote()
    },
    logout () {
      this.startLogout()
      this.$router.push('/login')
    }
  },
  async beforeMount () {
    await this.setNotes(this.uid)
  }
})
</script>