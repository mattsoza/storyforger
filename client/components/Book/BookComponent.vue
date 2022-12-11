<!-- Reusable component that displays a book, it's title, and gives the ability to open editing mode -->

<template>
  <div class="bookCard" @click="storeBook">
    <h2>{{ title }}</h2>
    <h3>{{ description }}</h3>
    <button @click="viewBook">View Book</button>
    <button @click="editBook">Edit Book</button>
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
      // this.$store.commit('setCurrentBook', this.book)
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
    editBook () {
      this.$store.commit('setCurrentBook', this.book)
      this.$router.push({ name: 'Story' })
    },
    viewBook () {
      this.$store.commit('setCurrentBook', this.book)
      this.$router.push({ name: 'book' })
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

      this.$store.commit('getBooks')
    }
  }
}
</script>

<style lang="scss">
div.bookCard {
  border: 1px solid black;
  border-radius: 8px;
  padding: 1em 1em;
  margin: 2em 10% 2em 10%;
  word-break: break-word;
}

div.bookCard>h2 {
  font-size: 2rem;
  margin: 0;
}

div.bookCard>h3 {
  font-size: 1.2rem;
  font-weight: normal;
}

</style>
