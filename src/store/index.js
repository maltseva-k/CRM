import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async fetchCurrency () {
      // Вместо запроса возвращаем промис со статикой, т.к. не https-запрос не уходит
      /* const res = await fetch('http://data.fixer.io/api/latest?access_key=7a6dc762f41771d2e14717db303967cf&symbols=USD,EUR,RUB')
      return await res.json() */
      return Promise.resolve({
        base: 'EUR',
        date: '2022-04-01',
        rates: { USD: 1.105953, EUR: 1, RUB: 91.871702 },
        success: true,
        timestamp: 1648811883
      })
    }
  },
  modules: {
    auth, info, category, record
  }
})
