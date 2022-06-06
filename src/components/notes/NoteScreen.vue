<template>
  <div class='notes__main-content'>
    <div>
      <NotesAppBar />

      <div class="notes__content">

        <input 
          type="text"
          placeholder="Some awesome title"
          class="notes__title-input"
          autocomplete="off"
          name="title"
          v-model="note.title"
        />

        <textarea
          placeholder="What happened today"
          class="notes__textarea"
          name="body"
          v-model="note.body"
        ></textarea>

        <div class="notes__image" v-if="note.url">
          <img 
            :src="note.url"
            alt="imagen"
          />
        </div>

      </div>
    </div>
    

    <button
      class='btn btn-block btn-danger' 
      v-on:click="deleteNote"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import NotesAppBar from "./NotesAppBar.vue";

export default defineComponent({
  components: { NotesAppBar },
  computed: {
    ...mapState({
      note: (state: any) => state.notes.active
    })
  },
  methods: {
    ...mapActions(['startDeleting']),
    async deleteNote () {
      await this.startDeleting(this.note.id)
    }
  }
})
</script>