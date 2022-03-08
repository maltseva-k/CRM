<template>
  <div class="input-field col s12 m6">
    <select ref="select" v-model="recordFilter" @change="filter()">
      <option value="all">Все записи</option>
      <option value="income">Только доходы</option>
      <option value="outcome">Только расходы</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array
    }
  },
  data: () => ({
    recordFilter: 'all'
  }),
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  methods: {
    filter () {
      this.$emit('filters', this.recordFilter)
    }
  }
}
</script>
