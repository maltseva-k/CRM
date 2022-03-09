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
      <router-link :to="{ name: 'record' }">
        Добавьте новую запись.
      </router-link></p>

    <section v-else>
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
        @sortBySum="sortBySum"
        @sortByDate="sortByDate"
        @sortByCategory="sortByCategory"
      />
      <div class="pagination">
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          class="paginate"
        />
        <select-page-count
        @changeCount="changeCount"
        class="page_count_select"
      />
      </div>
    </section>
  </div>
</template>

<script>
import PaginationMixin from '../mixins/PaginationMixin'
import HistoryTable from './componentsForHistory/HistoryTable'
import { Pie } from 'vue-chartjs'
import SelectType from './componentsForHistory/SelectType'
import SelectCategory from './componentsForHistory/SelectCategory'
import SelectPageCount from './componentsForHistory/SelectPageCount'

export default {
  name: 'History',
  metaInfo () {
    return {
      title: this.$title('Menu_History')
    }
  },
  components: {
    SelectPageCount,
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
    click: true,
    filtRecords: [],
    params: {
      categoryForSearch: [],
      typeRecordForSearch: 'all',
      quantityOfRecords: 5,
      sortQuality: 'amount'
    }
  }),
  async mounted () {
    // const categories = await this.$store.dispatch('fetchCategories')
    this.cats = await this.$store.dispatch('fetchCategories')
    for (let i = 0; i < this.cats.length; i++) {
      const catId = (this.cats[i]).id
      const recordsArray = await this.$store.dispatch('fetchRecords', catId)
      this.records = this.records.concat(recordsArray)
    }
    this.filtRecords = this.records
    this.setup(this.cats)
    this.loading = false
  },
  watch: {
    remove () {
      this.setup(this.cats)
      /* this.setupPagination(this.filtRecords.map(record => {
        return {
          ...record,
          categoryName: this.cats.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      })) */
    },
    filtRecords () {
      this.setup(this.cats)
      /* this.setupPagination(this.filtRecords.map(record => {
        return {
          ...record,
          categoryName: this.cats.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      })) */
    }
  },
  methods: {
    async selectCategory (categoriesArray) {
      this.params.categoryForSearch = categoriesArray
      // console.log(this.params)
      this.filtRecords = await this.$store.dispatch('findRecords', this.params)
      // console.log('найдено: ' + records)
      /*  const recordFilt = []
      for (let i = 0; i < categoriesArray.length; i++) {
        const record = this.records.filter(record => record.categoryId === categoriesArray[i])
        recordFilt.push(record)
      }
      this.records = recordFilt */
    },
    async changeCount (count) {
      this.params.quantityOfRecords = count
      this.remove += 1
      // this.filtRecords = await this.$store.dispatch('findRecords', this.params)
    },
    async filter (typeOfRecords) {
      this.params.typeRecordForSearch = typeOfRecords
      // console.log(this.params)
      if (!(this.params.categoryForSearch).length) {
        this.params.categoryForSearch = this.cats
      }
      this.filtRecords = await this.$store.dispatch('findRecords', this.params)
      /*  if (typeOfRecords === 'income') {
        this.filtRecords = this.records.filter(record => record.type === 'income')
        return this.filtRecords
      }
      if (typeOfRecords === 'outcome') {
        this.filtRecords = this.records.filter(record => record.type === 'outcome')
        return this.filtRecords
      }
      this.filtRecords = this.records
       return this.filtRecords */
    },
    async removeRecord (record) {
      this.filtRecords = this.filtRecords.filter(r => r.id !== record.id)
      this.remove += 3
      // console.log(this.updatedBill)
      const bill = record.type === 'income'
        ? this.updatedBill - record.amount
        : this.updatedBill + record.amount
      // console.log(bill)
      await this.$store.dispatch('updateInfo', { bill })
      // console.log(this.updatedBill)
    },
    sortByCategory () {
      this.click = !this.click
      if (this.click) {
        this.filtRecords.sort((a, b) => a.categoryId.localeCompare(b.categoryId))
        this.remove += 3
      } else {
        this.filtRecords.sort((a, b) => b.categoryId.localeCompare(a.categoryId))
        this.remove += 3
      }
    },
    sortBySum () {
      this.click = !this.click
      if (this.click) {
        this.filtRecords.sort((a, b) => a.amount - b.amount)
        this.remove += 3
      } else {
        this.filtRecords.sort((a, b) => b.amount - a.amount)
        this.remove += 3
      }
    },
    sortByDate () {
      this.click = !this.click
      if (this.click) {
        this.filtRecords.sort((a, b) => a.date.localeCompare(b.date))
        this.remove += 3
      } else {
        this.filtRecords.sort((a, b) => b.date.localeCompare(a.date))
        this.remove += 3
      }
    },
    setup (categories) {
      this.setupPagination(this.filtRecords.map(record => {
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
            return this.filtRecords.reduce((total, r) => {
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
  margin: 5px;
  width: 90%
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 95%;
  vertical-align: middle;
}

.paginate {
  text-align: center;
  flex-basis: auto;
  vertical-align: center;
  padding-top: 17px;
  justify-content: center;
}

.page_count_select {
  padding-top: 10px;
  padding-bottom: 0;
  flex-basis: 250px;
  vertical-align: middle;
  justify-content: end;
}

</style>
