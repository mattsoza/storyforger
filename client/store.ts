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
    // Sets the current book, and consequently the currentPage
    setCurrentBook(state, book) {
      state.currentBook = book;
      const currentPageInit = book.pages.filter(page => page._id === book.firstPage)[0]
      state.currentPage = currentPageInit
    },
    updateCurrentPage(state, page) {
      state.currentPage = page;
    },
    updatePage(state, page) {
      /**
       * Updates a page in our current book
       */
      let pages = [].concat(state.currentBook.pages) // Creates deep copy of array
      let id = page._id

      const idx = pages.findIndex((p) => p._id === id)

      pages[idx] = page
      console.log(pages)
      state.currentBook.pages = pages

      // let newPages = pages.filter((element) => {
      //   return !(String(element._id) === String(id))
      // })
      // newPages.push(page)
      // state.currentBook.pages = newPages

      state.currentPage = page
    }
  }
})

export default store;
