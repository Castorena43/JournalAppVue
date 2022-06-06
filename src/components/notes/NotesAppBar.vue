<template>
  <div class='notes__appbar'>
    <span>{{ dateNote }}</span>
    <input 
      ref='fileSelector'
      type='file' 
      style="display: none"
      @change="handleFileChange"
    />
    <div>
      <button class='btn' @click="handlePictureUpload">
        Upload Picture
      </button>
    </div>
  </div>  
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  data () {
    return {
      dateNote: ''
    }
  },
  computed: {
    ...mapState({
      active: (state: any) => state.notes.active
    })
  },
  methods: {
    ...mapActions(['startUploadingPicture']),
    handlePictureUpload () {
      this.$refs.fileSelector.click()
    },
    handleFileChange ({target}) {
      const file = target.files[0]
      this.startUploadingPicture(file)
    }
  },
  mounted () {
    this.dateNote = moment(this.active.date).format('MMM Do YY')
  }
})
</script>