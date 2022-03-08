<template>
  <div class="input-field" style="width: 30%;">
    <label for="select" class="active">
      Количество записей на странице:
    </label>
    <select id="select" ref="select" v-model="pageCount" @change="updatePageCount()">
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
  </div>
</template>

<script>
export default {
  data: () => ({
    pageCount: 5
  }),
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  methods: {
    updatePageCount () {
      this.$emit('changeCount', Number(this.pageCount))
    }
  }
}
</script>
