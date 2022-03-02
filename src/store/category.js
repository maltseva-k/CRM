import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

export default {
  actions: {
    async createCategory ({
      commit,
      dispatch
    }, {
      title,
      limit
    }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({
          title,
          limit
        }) || {}
        return {
          title,
          limit,
          id: category.key
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({
      commit,
      dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const categories = []
        let someCategories = await firebase.database().ref(`/users/${uid}/categories`).once('value', snapshot => {
          someCategories = snapshot.val() || {}
          Object.keys(someCategories).forEach(key => {
            categories.push({
              title: someCategories[key].title,
              limit: someCategories[key].limit,
              id: key
            })
          })
          return categories
        })
        return categories
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCategory ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')

        await firebase.database().ref(`/users/${uid}/categories/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory (
      {
        commit, dispatch
      },
      {
        title,
        limit,
        id
      }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({
      commit,
      dispatch
    }, id) {
      try {
        const uid = await dispatch('getUid')
        let someCategory = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value', snapshot => {
          someCategory = snapshot.val() || {}
        })).val()
        return { ...someCategory, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
