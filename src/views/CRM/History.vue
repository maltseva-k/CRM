<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading"/>

    <p
      class="center"
      v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">
        Добавьте новую запись.
      </router-link></p>

    <section v-else>
      <button @click="found">Искать</button>
      <div class="flex">
        <select-type
          :records="records"
          @filters="filter"
        />
        <select-category
          :category="cats"
          @selectedCategories="selectCategory"
        />
      </div>
      <history-table
        :records="items"
        @deleted="removeRecord"
      />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        style="text-align: center"
      />
    </section>
  </div>
</template>

<script>
import PaginationMixin from '../../mixins/PaginationMixin'
import HistoryTable from './componentsForCRM/HistoryTable'
import { Pie } from 'vue-chartjs'
import SelectType from './componentsForCRM/SelectType'
import SelectCategory from './componentsForCRM/SelectCategory'

export default {
  name: 'History',
  metaInfo () {
    return {
      title: this.$title('Menu_History')
    }
  },
  components: {
    SelectCategory,
    HistoryTable,
    SelectType
  },
  extends: Pie,
  mixins: [PaginationMixin],
  data: () => ({
    loading: true,
    records: [],
    remove: 1,
    cats: [],
    filtRecords: [],
    params: {
      categoryForSearch: [],
      typeRecordForSearch: '',
      paginationCount: 5,
      sortQuality: 'amount'
    }
  }),
  async mounted () {
    const categories = await this.$store.dispatch('fetchCategories')
    this.cats = await this.$store.dispatch('fetchCategories')
    for (let i = 0; i < this.cats.length; i++) {
      const catId = (this.cats[i]).id
      const recordsArray = await this.$store.dispatch('fetchRecords', catId)

      this.records = this.records.concat(recordsArray)
    }
    this.setup(categories)
    this.loading = false
  },
  watch: {
    remove () {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: this.cats.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    },
    filtRecords () {
      this.setupPagination(this.filtRecords.map(record => {
        return {
          ...record,
          categoryName: this.cats.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    }

  },

  methods: {
    async selectCategory (categoriesArray) {
      this.params.categoryForSearch = categoriesArray
      // console.log(this.params)
      const rrr = await this.$store.dispatch('findRecords', this.params)
      console.log('найдено: ' + rrr)
      const recordFilt = []
      for (let i = 0; i < categoriesArray.length; i++) {
        const record = this.records.filter(record => record.categoryId === categoriesArray[i])
        recordFilt.push(record)
      }
      this.records = recordFilt
    },
    async found () {
      await this.$store.dispatch('searchRecord')
    },
    filter (typeOfRecords) {
      if (typeOfRecords === 'income') {
        this.filtRecords = this.records.filter(record => record.type === 'income')
        return this.filtRecords
      }
      if (typeOfRecords === 'outcome') {
        this.filtRecords = this.records.filter(record => record.type === 'outcome')
        return this.filtRecords
      }
      this.filtRecords = this.records
      return this.filtRecords
    },
    async removeRecord (record) {
      this.records = this.records.filter(r => r.id !== record.id)
      this.remove += 3
      console.log(this.updatedBill)
      const bill = record.type === 'income'
        ? this.updatedBill - record.amount
        : this.updatedBill + record.amount
      console.log(bill)
      await this.$store.dispatch('updateInfo', { bill })
      console.log(this.updatedBill)
    },
    setup (categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId)?.title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]

      })
    }
  },
  computed: {
    updatedBill () {
      return this.$store.getters.info.bill
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  justify-content: space-between;
}

.flex div {
  margin-top: 5px;
  margin-bottom: 5px;
}
.flex div {
  width: 90%;
}
</style>
