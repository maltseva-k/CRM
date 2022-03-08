<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout text-wrap">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

      <nav-bar @clickNavBar="isOpen = !isOpen"/>

      <side-bar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link :to="{ name: 'record' }" class="btn-floating btn-large blue" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/app/NavBar'
import SideBar from '../components/app/SideBar'
import messages from '../utils/messages'

export default {
  name: 'main-layout',
  components: {
    NavBar,
    SideBar
  },
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }

}
</script>

<style>
/*временная залипуха скролла от тултипа*/
::-webkit-scrollbar {
  width: 0;
}
</style>
