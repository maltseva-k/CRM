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
        let someRecords = await firebase.database().ref(`/users/${uid}/categories/${catId}/records`).once('value', snapshot => {
          someRecords = snapshot.val() || {}
          // return Object.keys(someRecords).map(key => ({ ...someRecords[key], id: key }))
          Object.keys(someRecords).forEach(key => {
            records.push({
              amount: someRecords[key].amount,
              categoryId: someRecords[key].categoryId,
              date: someRecords[key].date,
              description: someRecords[key].description,
              type: someRecords[key].type,
              id: key
            })
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
        let someRecord = (await firebase.database().ref(`/users/${uid}/categories/${cid}/records`).child(id).once('value', snapshot => {
          someRecord = snapshot.val() || {}
        })).val()
        return { ...someRecord, id }
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
    }
  }
}
