<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th @click="sortBySum">
          Сумма
          <i class="material-icons">unfold_more</i>
        </th>
        <th @click="sortByDate">
          Дата
          <i class="material-icons">unfold_more</i>
        </th>
        <th @click="sortByCategory">
          Категория
          <i class="material-icons">unfold_more</i>
        </th>
        <th>Тип</th>
        <th>Открыть</th>
        <th>Удалить</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, index) of records" :key="record.id">
        <td>{{ index + 1}}</td>
        <td>{{ record.amount | currencyFilter('RUB') }}</td>
        <td>{{ record.date | dateFilter('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span
            class="white-text badge"
            :class="[record.typeClass]"
          >{{ record.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click="openRecord(record)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
        <td>
          <button
            v-tooltip="'Удалить запись'"
            class="btn-small btn"
            @click="deleteRecord(record)"
            style="background-color: red;"
          >
           <i class="material-icons" style="background-color: red">delete</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    click: true
  }),
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  methods: {
    openRecord (record) {
      this.$router.push('/detail/' + record.categoryId + '/' + record.id)
    },
    /*     async UpdateBillBeforeDelRecord (deletedRecord) {
      try {
        console.log(this.updatedBill)
        const bill = deletedRecord.type === 'income'
          ? this.updatedBill - this.amount
          : this.updatedBill + this.amount
        await this.$store.dispatch('updateInfo', { bill })
        console.log(this.updatedBill)
      } catch (e) {}
    }, */
    async deleteRecord (deletedRecord) {
      try {
        await this.$store.dispatch('removeRecord', deletedRecord)
        this.$message('Запись удалена')
        this.$emit('deleted', deletedRecord)
      } catch (e) {
      }
      /* this.records = this.records.filter(record => record.id !== deletedRecord)
      this.$emit('recordsBeforeDestroy', this.records) */
    },
    sortByCategory () {
      this.click = !this.click
      if (this.click) {
        this.records.sort((a, b) => a.categoryName.localeCompare(b.categoryName))
      } else {
        this.records.sort((a, b) => b.categoryName.localeCompare(a.categoryName))
      }
    },
    sortBySum () {
      this.click = !this.click
      if (this.click) {
        this.records.sort((a, b) => a.amount - b.amount)
      } else {
        this.records.sort((a, b) => b.amount - a.amount)
      }
    },
    sortByDate () {
      this.click = !this.click
      if (this.click) {
        this.records.sort((a, b) => a.date.localeCompare(b.date))
      } else {
        this.records.sort((a, b) => b.date.localeCompare(a.date))
      }
    }
  }/* ,
  computed: {
    updatedBill () {
      return this.$store.getters.info.bill
    }
  } */
}
</script>

<style>
 th i, th {
  vertical-align: middle;
  cursor: pointer;
}
</style>
