<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </div>
</template>

<script>
import messages from '../utils/messages'

export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так!')
    }
  }
}
</script>
