<template>
    <component :is="layout">
      <router-view />
    </component>
</template>

<script>
import emptyLayout from './layouts/emptyLayout'
import mainLayout from './layouts/mainLayout'

export default {
  components: {
    emptyLayout,
    mainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="scss">

@import '~materialize-css/dist/css/materialize.min.css';
@import './css/style.css';
</style>
