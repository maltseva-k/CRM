<template>
  <div class="input-field" style="width: 30%;">
    <div class="left-column">
      <label for="select" class="active">
        Количество записей:
      </label>
    </div>
    <div class="right-column">
      <select id="select" ref="select" v-model="pageCount" @change="updatePageCount()">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
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

<style>
.left-column {
  display: inline-block;
}
.left-column label{
  font-size: larger;
}
.right-column {
  display: inline-block;
  min-width: 30px;
  max-width: 40px;
  margin-left: 5px;
}
</style>
