<!-- Page for displaying all the books that a user has created -->

<template>
  <div class="bookPage">
    <NewBookComponent class="newBookButton" />
    <BookComponent
      v-for="book in $store.state.books"
      :key="book._id"
      :book="book"
    />
  </div>
</template>

<script>
import NewBookComponent from '@/components/Book/NewBookComponent.vue'
import BookComponent from '@/components/Book/BookComponent.vue'

export default {
  name: 'BookPage',
  components: {
    NewBookComponent,
    BookComponent
  },
  data () {
    return {
      placeholder: 'test'
    }
  },
  async mounted() {
    this.$store.commit('getBooks');
  }
}
</script>

<style>
.bookPage {
  width: auto;
}
</style>
