<!-- Reusable component that displays a book, it's title, and gives the ability to open editing mode -->

<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <button @click="">Edit</button>
    <button @click="">View</button>
    <button @click="deleteBook">Delete</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BookComponent',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: this.book.title,
      description: this.book.description,
      bookId: this.book._id,
      editing: false
    }
  },
  methods: {
    editTitle(evt) {
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
    deleteBook(evt) {
      /**
       * Deletes this book from the user's account
       */
      const params = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }

      fetch(`/api/book/${this.bookId}`, params)
        .then((res) => { res.json() })
        .then((data) => { console.log(data) })
    }
  }
}
</script>

<style>

</style>