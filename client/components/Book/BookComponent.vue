<!-- Reusable component that displays a book, it's title, and gives the ability to open editing mode -->

<template>
  <div @click="storeBook">
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <router-link class="routelink" to='/story'>Edit Book</router-link>
    <button @click="deleteBook">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'BookComponent',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: this.book.title,
      description: this.book.summary,
      bookId: this.book._id,
      editing: false
    }
  },
  methods: {
    storeBook () {
      /**
       * Updates the current book in vuex
       */
      this.$store.commit('setCurrentBook', this.book)
    },
    editTitle (evt) {
      /**
       * Edits the title of the book
       */
      const params = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: { title: 'evt.body' }
      }

      fetch(`/api/book/${this.bookId}`, params)
        .then((res) => {})
    },
    async deleteBook (evt) {
      /**
       * Deletes this book from the user's account
       */
      const params = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }

      await fetch(`/api/book/${this.bookId}`, params)
        .then((res) => { res.json() })
        .then((data) => { console.log(data) })
      
      this.$store.commit('getBooks');
    }
  }
}
</script>

<style>

</style>
