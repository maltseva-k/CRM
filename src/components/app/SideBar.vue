<template>
  <ul class="sidenav app-sidenav padding" :class="{open: value}">
    <router-link
      tag="li"
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      > {{ link.title }}</router-link>
  </ul>
</template>

<script>
import localizeFilter from '../../filters/localizeFilter'

export default {
  props: ['value'],

  data: () => (
    {
      links: [
        {
          title: localizeFilter('Menu_Bill'),
          url: '/',
          exact: true
        },
        {
          title: localizeFilter('Menu_History'),
          url: '/history'
        },
        {
          title: localizeFilter('Menu_Planning'),
          url: '/planning'
        },
        {
          title: localizeFilter('Menu_NewRecord'),
          url: '/record'
        },
        {
          title: localizeFilter('Menu_Categories'),
          url: '/categories'
        }
      ]
    }
  )
}
</script>

<style>
.padding li{
  padding: 10px 30px;
  vertical-align: middle;
}
</style>
