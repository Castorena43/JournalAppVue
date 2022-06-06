<template>
  <div class="journal">
    <NoteScreen v-if="!isEmptyActive" /> 
    <NothingSelected v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from 'vuex';
import NoteScreen from "../notes/NoteScreen.vue";
import NothingSelected from "./NothingSelected.vue";

export default defineComponent({
  components: {
    NoteScreen,
    NothingSelected
  },
  computed: {
    ...mapGetters(['isEmptyActive'])
  }
})
</script>