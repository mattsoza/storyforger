<!-- Webpage containing all the page elements; the PagePage! :P -->
<!-- Webpage containing all the page elements; the PagePage! :P -->


<template>
<div @pageChange="pageChange">
    We're viewing PagePage!
  
    We have {{book}} which has pages: {{book.pages}}
    <PageListComponent :pages="book.pages"/>
    <ConnectionListComponent :page="currentPage"/>
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
      currentPage: this.$store.state.currentPage
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
      // const ahhh = await json(response);
      // console.log(ahhh);
      const page = await response.text();
      this.currentPage =JSON.parse(page);
      console.log("newly fetched page: ", this.currentPage);

    },

    
  }
}
</script>
