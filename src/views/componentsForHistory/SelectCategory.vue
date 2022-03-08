<template>
  <div class="input-field col s12 m6">
    <select multiple ref="select" v-model="selectCategory" @change="changeCategory()">
      <option disabled selected value="">Выберите категорию</option>
      <option
        v-for="cat in category"
        :key="cat.id"
        :value="cat"
      >
        {{ cat.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array
    }
  },
  data: () => ({
    selectCategory: []
  }),
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
    this.selectCategory = this.category
  },
  methods: {
    changeCategory () {
      this.$emit('selectedCategories', this.selectCategory)
    }
  }
}
</script>
