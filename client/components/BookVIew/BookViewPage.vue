<!-- Reusable component showing a page of the book -->

<template>
  <div>
    <h3>{{ page.title }}</h3>
    <img
    v-bind:src="page.image"
    class="pageImage"
    />
    <h4>{{ page.text }}</h4>
    <!-- <a v-for="connection in page.connections"> -->
    <!-- Commenting here until we get a response on how pages will look -->
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  data () {
    return {
      book: this.$store.state.currentBook,
      page: this.$store.state.currentPage
    }
  }
}

</script>

<style>

.paegImage {
  min-height: 80vh;
}

</style>