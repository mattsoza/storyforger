<!-- Webpage containing all the page elements; the PagePage! :P -->
<!-- Webpage containing all the page elements; the PagePage! :P -->


<template>
<div @pageChange="pageChange">

    <p>Welcome to PagePage.</p>

    <h2>Page List</h2>
    <PageListComponent :pages="book.pages"/>

    <button @click="newPage">New Page</button>
  </div>
</template>

<script>
import PageListComponent from './PageListComponent.vue'
import ConnectionListComponent from '../Connection/ConnectionListComponent.vue';

export default {
  name: 'PagePage',
  components: {
    PageListComponent,
    ConnectionListComponent
  },
  data () {
    return {
      book: this.$store.state.currentBook
      // currentPage: this.$store.state.currentPage
    }
  },
  mounted () {
    this.book = this.$store.state.currentBook;
  },
  methods: {
    pageChange () {

    },
    async newPage () {
      const fields = { bookId: this.book._id }
      const response = await fetch(`/api/page/${this.book._id}`, { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })

      if (!response.ok) {
        console.log('okay')
        const res = await response.json()
        console.log(res)
        throw new Error(res.error)
      }

      const page = (await response.json()).page
      this.book.pages.push(page)
    }
  }
}
</script>
