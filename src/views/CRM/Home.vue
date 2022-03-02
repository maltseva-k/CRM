<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        @click="refresh"
        class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div  v-else class="row">
      <home-bill
        :rates="currency.rates"
      />

      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      />

    </div>
  </div>
</template>

<script>

import HomeBill from './HomeComponent/HomeBill'
import HomeCurrency from './HomeComponent/HomeCurrency'

export default {
  name: 'Home',
  metaInfo () {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }

}
</script>
