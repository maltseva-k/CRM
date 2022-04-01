<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur of currencies"
              :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ getCorrectRates(cur) }}</td>
              <td>{{ date | dateFilter('date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR'],
    date: new Date()
  }),
  methods: {
    getCorrectRates (cur) {
      let correct
      if (cur !== 'RUB') {
        correct = (this.rates.RUB / this.rates[cur]).toFixed(2)
      } else {
        correct = (this.rates.RUB / this.rates[cur])
      }
      return correct
    }
  }
}
</script>
