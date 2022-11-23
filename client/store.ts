import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: null
  },
  mutations: {
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
        * @param username - new username to set
        */
      state.username = username;
    }
  }
})

export default store;
