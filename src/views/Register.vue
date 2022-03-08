<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model="$v.email.$model"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            autocomplete="off"
          >
          <label
            for="email"
          >
            Email
          </label>
          <small
            v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid"
          >
            Поле Email не должно быть пустым
          </small>
          <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
          >
            Введите корректный Email
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model="$v.password.$model"
            class="validate"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
          >
            Поле Пароль не должно быть пустым
          </small>
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
          >
            Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} симоволов. Сейчас он {{ password.length }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="$v.name.$model"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          >
          <label for="name">Имя</label>
          <small
          v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >
            Поле Name не должно быть пустым
          </small>
        </div>
        <p>
          <label>
            <input
              type="checkbox"
              v-model="agree"
            />
            <span>
              С правилами согласен
            </span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            :disabled="agree === false"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center"
        >
          Уже есть аккаунт?
          <router-link :to="{ name: 'login' }">Войти!</router-link>
        </p>
      </div>
    </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  metaInfo () {
    return {
      title: this.$title('Registration')
    }
  },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required
    },
    agree: {
      checked: v => v
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
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('registerUser', formData)
        this.$router.push({ name: 'main' })
      } catch (e) {}
    }
  }
}
</script>
