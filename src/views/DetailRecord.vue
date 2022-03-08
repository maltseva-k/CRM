<template>
  <div>
    <loader v-if="loading" />
    <div v-else-if="record">
      <div  class="breadcrumb-wrap">
        <router-link :to="{ name: 'history' }" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red': record.type === 'outcome',
               'green': record.type === 'income'
               }">
            <div class="card-content white-text center">
              <p>
                Описание: {{ record.description }}
              </p>
              <p>
                Сумма: {{ record.amount | currencyFilter }}
              </p>
              <p>
                Категория: {{ record.categoryName}}
              </p>

              <small>
                {{  record.date | dateFilter('datetime') }}
              </small>

              <div class="containerForUpdate">
                <div v-if="isVisiable">
                  <input
                    v-model="updatedDescription"
                    type="text"
                  >
                  <button
                    v-tooltip="'Принять изменения'"
                    class="btn-small btn position"
                    @click="updateRecord(record)">
                    <i class="tiny material-icons">check</i>
                  </button>
                </div>
                </div>

                <button
                  v-tooltip="'Изменить описание'"
                  class="btn-small btn position"
                  @click="openUpdatingRecord">
                  <i class="tiny material-icons">create</i>
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>
      Запись с id={{$route.params.id}} не найдена.
    </p>
  </div>
</template>

<script>
export default {
  name: 'detail',

  data: () => ({
    record: null,
    loading: true,
    isVisiable: false,
    updatedDescription: ''
  }),
  metaInfo () {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const cid = this.$route.params.cid
    const allId = {
      recordId: id,
      categoryId: cid
    }

    const record = await this.$store.dispatch('fetchRecordsById', allId)

    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
  methods: {
    openUpdatingRecord () {
      this.isVisiable = !this.isVisiable
      this.updatedDescription = this.record.description
    },
    async updateRecord (record) {
      record.description = this.updatedDescription
      this.$message('Описание изменено')
      await this.$store.dispatch('updateRecord', record)
      this.isVisiable = false
    }
  }
}
</script>

<style>
.containerForUpdate {
  display: flex;
  justify-content: center;
  vertical-align: middle;
}
.position {
  display: flex;
  justify-content: center;
  margin-left: auto;
}
</style>
