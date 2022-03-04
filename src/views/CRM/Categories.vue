<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div v-else class="row">
        <category-create
          @created="addNewCategory"
        />
        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
          @deletedCategory="deleteCategory"
        />
        <p v-else>
          Категорий пока нет!
        </p>
      </div>
    </section>
  </div>

</template>

<script>
import CategoryCreate from './CategoriesComponents/CategoryCreate'
import CategoryEdit from './CategoriesComponents/CategoryEdit'

export default {
  name: 'categories',
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount += 1
    },
    deleteCategory (id) {
      this.categories = this.categories.filter(c => c.id !== id)
      this.updateCount += 3
    }

  }
}
</script>
