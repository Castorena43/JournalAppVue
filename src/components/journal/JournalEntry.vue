<template>
  <div class='journal__entry pointer' @click="setNoteActive">
    <div class='journal__entry-picture' :style="{
        backgroundSize: 'cover',
        backgroundImage: 'url('+note.url+')'
      }">
    </div>
    <div class='journal__entry-body'>
      <p class='journal__entry-title'>
        {{ note.title }}
      </p>
      <p class='journal__entry-content'>
        {{ note.body }} 
      </p>
    </div>

    <div class='journal__entry-date-box'>
      <span>{{ getDayofWeek }}</span>
      <span>{{ getDay }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import moment from 'moment';

export default defineComponent({
  props: ['note'],
  computed: {
    getDayofWeek () {
      return moment(this.note.date).format('dddd')
    },
    getDay () {
      return moment(this.note.date).format('Do')
    }
  },
  methods: {
    ...mapMutations(['activeNote']),
    setNoteActive () {
      this.activeNote(this.note)
    },
    
  }
})
</script>