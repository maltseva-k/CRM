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
.firstDiv{
  text-align: center;
  color: #404040;
}
@import '~materialize-css/dist/css/materialize.min.css';
@import './css/styleFromMinin.css';
</style>
