<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">{{ 'Bookkeeping' | localizeFilter }}</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="$v.email.$model"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
          >
            {{ 'Empty_email' | localizeFilter }}
          </small>
          <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
          >
            {{ 'Enter_valid_email' | localizeFilter}}
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="$v.password.$model"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">{{ 'Password' | localizeFilter }}</label>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
          >
            {{'Enter_password' | localizeFilter}}
          </small>
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
          >
            Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} симоволов. Сейчас он {{ password.length }}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
</template>

<script>

import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '../../utils/messages'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Login',
  metaInfo () {
    return {
      title: this.$title('Entry')
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (user === null) {
          await this.$store.dispatch('loginUser', formData)
          await this.$router.push('/')
        } else {
          this.$message('Вы зашли в новый профиль. Предыдущая сессия завершена')
          await this.$store.dispatch('logout')
          await this.$store.dispatch('loginUser', formData)
          await this.$router.push('/')
        }
      } catch (e) {}
    }
  }
}
</script>
