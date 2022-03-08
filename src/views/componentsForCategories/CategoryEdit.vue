<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
            >{{ c.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="$v.title.$model"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            autocomplete="off"
          >
          <label
            for="name"
            class="active"
          >
            Название
          </label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="$v.limit.$model"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label
            for="limit"
            class="active"
          >
            Лимит
          </label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            Минимальная величина {{ $v.limit.$params.minValue.min}}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>
        <button
          class="btn waves-effect waves-light"
          type="button"
          style="margin-left: 10px"
          @click.prevent="deleteCategory(current)"
        >
          Удалить
          <i class="material-icons right">delete</i>
        </button>
      </form>
      <PopupForDeleted
        :is-open="isPopupOpen"
        @close="closeModal()"
        @ok="confirmModal(current)"
      />
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import PopupForDeleted from './PopupForDeleted'

export default {
  components: { PopupForDeleted },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: '',
    current: null,
    isPopupOpen: false,
    confirmed: false

  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(10) }
  },
  watch: {
    current (catId) {
      const {
        title,
        limit
      } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const {
      id,
      title,
      limit
    } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория изменена')
        this.$emit('updated', categoryData)
        // this.$v.$reset()
      } catch (e) {
      }
    },
    closeModal () {
      this.isPopupOpen = false
    },
    async confirmModal (id) {
      this.isPopupOpen = false
      await this.findRecordAndUpdateBill(id)
      try {
        await this.$store.dispatch('deleteCategory', id)
        this.$message('Категория удалена')
        this.$emit('deletedCategory', id)
        this.$v.$reset()
      } catch (e) {
      }
    },
    async findRecordAndUpdateBill (id) {
      const recordsForDelete = await this.$store.dispatch('fetchRecords', id)
      console.log(recordsForDelete)
      let changedAmount = 0
      for (let i = 0; i < recordsForDelete.length; i++) {
        const record = recordsForDelete[i]
        if (record.type === 'income') {
          changedAmount -= record.amount
        } else {
          changedAmount += record.amount
        }
      }
      const billBeforeDelete = this.$store.getters.info.bill
      const bill = billBeforeDelete + changedAmount
      await this.$store.dispatch('updateInfo', { bill })
    },

    async deleteCategory (id) {
      this.isPopupOpen = true
    }

  },
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style>
select {
  color: black;
}
</style>
