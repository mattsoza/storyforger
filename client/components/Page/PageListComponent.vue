<!-- Component that displays all the pages of a book -->

<template>
  <div>
    <ul>
      <li
      v-for="page in pages"
      :key="page._id"
      :page="page"
      @click="pageClicked(page)"
      >{{ page.title }}</li>
    </ul>
    <PageView v-if="$store.state.currentPage" :page="$store.state.currentPage"  :pages="pages"/>
  </div>
</template>

<script>
import PageView from './PageView.vue'

export default {
  name: 'PageListComponent',
  components: {
    PageView
  },
  props: {
    // The array containing all the page objects. Calculated upon opening book?
    pages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: this.pages.filter(page => page._id === this.$store.state.currentBook.firstPage)[0]
    }
  },
  methods: {
    pageClicked (page) {
      this.$store.commit('updateCurrentPage', page)
    }
  }
}

</script>

<style>
ul>li {
  border: 1px solid black;
}
ul>li:hover {
  background-color: #bbbbbb;
}
</style>
