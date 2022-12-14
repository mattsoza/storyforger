<!-- Webpage containing all the page elements; the PagePage! :P -->
<!-- Webpage containing all the page elements; the PagePage! :P -->

<template>
<div @pageChange="pageChange">

    <h2>{{book.title}}</h2>

    
    <div class="page-list">
      <h2 class="pageListTitle">Page List</h2>
      <ul>
        <li
        v-for="page in book.pages"
        :key="page._id"
        :page="page"
        :class="{currentPage: $store.state.currentPage._id === page._id}"
        @click="pageClicked(page)"
        >{{ page.title }}</li>
      </ul>
      <button @click="newPage">New Page</button>
    </div>

    <PageView class="page-view" v-if="$store.state.currentPage" :page="$store.state.currentPage"  :pages="$store.state.currentBook.pages"/>
  </div>
</template>

<script>
import ConnectionListComponent from '../Connection/ConnectionListComponent.vue'
import PageView from './PageView.vue'

export default {
  name: 'PagePage',
  components: {
    ConnectionListComponent,
    PageView
  },
  data () {
    return {
      book: this.$store.state.currentBook,
      currentPage: this.$store.state.currentBook.pages.filter(page => page._id === this.$store.state.currentBook.firstPage)[0]
    }
  },
  mounted () {
    this.book = this.$store.state.currentBook
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
    },
    pageClicked (page) {
      this.$store.commit('updateCurrentPage', page)
    }
  }
}
</script>

<style scoped>
ul>li {
  border: 1px solid black;
  margin: .2em 0;
  padding: .4em;
  border-radius: .4em;
}
ul>li:hover {
  background-color: #bbbbbb;
}
.page-list {
  float: left;
  width: 28%;
  max-width: 15em;
  background-color: #dddddd;
  margin: 0 2% 0 1%;
  display: grid;
  border-radius: .6em;
}
.page-view {
  overflow: hidden;
  margin: 0 1% 0 0;
}
.currentPage {
  background-color: #87ceeb;
}
ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0 .6em;
}
button {
  margin: .6em 20%;
}
.pageListTitle {
  margin-left: .6em;
  margin-bottom: .6em;
}
</style>
