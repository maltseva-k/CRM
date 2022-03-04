<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          v-model="$v.name.$model"
          id="description"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label
          for="description"
          class="active">
          {{ 'Name' | localizeFilter }}
        </label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ 'Enter_name' | localizeFilter }}
        </small>
      </div>
      <div class="switch">
        <label>
          English
          <input
            v-model="isRuLocale"
            type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit">
        {{ 'Update' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import localizeFilter from '../../filters/localizeFilter'

export default {
  metaInfo () {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        this.$message(localizeFilter('Data_changed'))
      } catch (e) {}
    }
  }

}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
