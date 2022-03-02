<template>
  <div class="input-field col s12 m6" style="background-color: cadetblue">
    <select multiple ref="select" v-model="selectCategory" @change="changeCategory()">
      <option
        v-for="cat in category"
        :key="cat.id"
        selected
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
    console.log(this.category)
  },
  methods: {
    changeCategory () {
      console.log(this.selectCategory)
    }
  }

}
</script>
