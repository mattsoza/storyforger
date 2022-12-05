<!-- Webpage containing all the page elements; the PagePage! :P -->
<!-- Webpage containing all the page elements; the PagePage! :P -->


<template>
<div @pageChange="pageChange">

    Welcome to Page.Page. Current Page is {{this.currentPage}}.

    Page List:
    <PageListComponent :pages="book.pages"/>

    End of Page List Component.

    <button @click = newPage> New Page</button>
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
      book: this.$store.state.currentBook,
      // currentPage: this.$store.state.currentPage
    }
  },
  mounted() {
    this.book = this.$store.state.currentBook;
    console.log(this.$store.state.currentBook);
  },
  methods: {
    pageChange () {

    },
    async newPage(){
      console.log("got to newpage function");
      console.log(this.book._id);
      const fields = {bookId: this.book._id};
      const response = await fetch(`/api/page/${this.book._id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}});

      console.log("response", response);

      if (!response.ok) {
                console.log("okay");
                const res = await response.json();
                console.log(res);
                throw new Error(res.error);
      }

      const page = await response.text();
      newPage =JSON.parse(page);
      //TODO: update current page and also book
      // console.log("newly fetched page: ", this.currentPage);

    },

    
  }
}
</script>
