<!-- Webpage containing all the page elements; the PagePage! :P -->

<template>
<div @pageChange="pageChange">
  <PageListComponent :pages="book.pages"/>
</div>
</template>

<script>
import PageListComponent from './PageListComponent.vue'

export default {
  name: 'PagePage',
  components: {
    PageListComponent
  },
  data () {
    return {
      book: this.$store.state.currentBook,
      currentPage: null
    }
  },
  mounted() {
    this.book = this.$store.state.currentBook;
    console.log(this.$store.state.currentBook);
  },
  methods: {
    pageChange () {

    }
  }
}
</script>
