<!-- Webpage containing all the page elements; the PagePage! :P -->
<!-- Webpage containing all the page elements; the PagePage! :P -->

<template>
<div class="pagePage" @pageChange="pageChange">

    <h2>{{book.title}}</h2>


    <div class="page-list">
      <h2>Page List</h2>
      <ul>
        <li
        v-for="page in book.pages"
        :key="page._id"
        :page="page"
        :class="[{currentPage: $store.state.currentPage._id === page._id},
                {childPage: $store.state.currentBook.pages.find((p) => p._id === $store.state.currentPage._id).connections.findIndex((c) => c.child === page._id) !== -1}]"
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
}

.childPage {
  background-color: yellow;
}

.page-view {
  overflow: hidden;
  background-color: #dddddd;
  margin: 0 1% 0 0;
}
.currentPage {
  background-color: #51d8d8;
}
.currentPage:hover {
  background-color: #00bbbb;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
button {
  margin: 0 20%;
}
.pagePage {
  
}
</style>
