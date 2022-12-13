<!-- Reusable component showing a page of the book -->

<template>
  <div>
    <h3>{{ this.$store.state.currentPage.title }}</h3>
    <img
    v-bind:src="this.$store.state.currentPage.image"
    class="pageImage"
    />
    <h4>{{ this.$store.state.currentPage.text }}</h4>
    <a
    v-for="connection in this.$store.state.currentPage.connections"
    :key="connection._id"
    @click="nextPage(connection)"
    >
      {{ connection.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  data () {
    return {
      book: this.$store.state.currentBook
    }
  },
  methods: {
    nextPage (connection) {
      this.$store.commit('updateCurrentPageId', connection.child)
    }
  }
}

</script>

<style>

.pageImage {
  max-height: 70vh;
}

</style>
