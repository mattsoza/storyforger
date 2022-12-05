import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: null,
    books: [], // Initalized on sign-in
    currentBook: null,
    currentPage: null
  },
  mutations: {
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
        * @param username - new username to set
        */
      state.username = username;
    },
    async getBooks(state) {
      const url ='/api/book';
      const res = await fetch(url).then(async r => r.json());
      state.books = res;
    },
    setCurrentBook(state, book) {
      state.currentBook = book;
    }
  }
})

export default store;
