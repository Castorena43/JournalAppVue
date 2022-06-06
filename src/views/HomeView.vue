<template>
  <div class="journal__main-content">
    <NavBar />
    <JournalScreen />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from '@/components/NavBar.vue';
import JournalScreen from '@/components/journal/JournalScreen.vue';

@Options({
  components: {
    NavBar,
    JournalScreen
  },
})
export default class HomeView extends Vue {}
</script>
