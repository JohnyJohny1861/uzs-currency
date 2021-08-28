import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deletedData: []
  },
  getters: {
    deletedData: state => state.deletedData,
  },
  mutations: {
    setDeletedData: (state, data) => {
      state.deletedData = data;
      localStorage.setItem('deletedData', JSON.stringify(state.deletedData));
    },
  },
})
