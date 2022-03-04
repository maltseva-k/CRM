import firebase from 'firebase/compat/app'
export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        const catId = record.categoryId
        return await firebase.database().ref(`/users/${uid}/categories/${catId}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        const id = record.id
        const catId = record.categoryId
        return await firebase.database().ref(`/users/${uid}/categories/${catId}/records/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }, catId) {
      try {
        const uid = await dispatch('getUid')
        const records = []
        const snapshot = await firebase
          .database()
          .ref(`/users/${uid}/categories/${catId}/records`)
          .get()
        const someRecords = snapshot.val() || {}
        Object.keys(someRecords).forEach(key => {
          console.log(key)
          records.push({
            amount: someRecords[key].amount,
            categoryId: someRecords[key].categoryId,
            date: someRecords[key].date,
            description: someRecords[key].description,
            type: someRecords[key].type,
            id: key
          })
        })

        return records
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordsById ({ dispatch, commit }, allId) {
      try {
        const uid = await dispatch('getUid')
        const id = allId.recordId
        const cid = allId.categoryId
        const snapshot = await firebase
          .database()
          .ref(`/users/${uid}/categories/${cid}/records`)
          .child(id)
          .get()
        const someRecord = snapshot.val()
        someRecord.id = snapshot.key
        return someRecord
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        const id = record.id
        const catId = record.categoryId
        const description = record.description
        await firebase.database().ref(`/users/${uid}/categories/${catId}/records/${id}`).update({ description })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async searchRecord ({ dispatch }) {
      const uid = await dispatch('getUid')
      await firebase.database().ref(`/users/${uid}/categories/`).on('child_added', function (data) { console.log(data.val()) })
    },
    async findRecords ({ dispatch }, params) {
      console.log(params)
      const uid = await dispatch('getUid')
      const id = params.categoryForSearch
      let record = await firebase.database().ref(`/users/${uid}/categories/${id}/records`).once('value').then((snapshot) => {
        record = snapshot.val()
      })
      console.log(record)
    }
  }
}
/*
try {
  const uid = await dispatch('getUid')
  const records = []
  const snapshot = await firebase
    .database()
    .ref(`/users/${uid}/categories/${catId}/records`)
    .orderByChild('amount')
    .equalTo(700)
    .once('value')
  const someRecords = snapshot.val() || {}
  Object.keys(someRecords).forEach(key => {
    console.log(key)
    records.push({
      amount: someRecords[key].amount,
      categoryId: someRecords[key].categoryId,
      date: someRecords[key].date,
      description: someRecords[key].description,
      type: someRecords[key].type,
      id: key
    })
  })  */
