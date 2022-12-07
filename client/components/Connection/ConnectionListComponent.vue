<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <ul>
        <div v-if="(pages.length!==0 && pages.length!==1)">
        Link {{page.title}} to new Page

        <li
        v-for="connection in connections"
        :key="connection._id"
        :connection="connection"
        > <ConnectionComponent 
            :connection="connection"
        /></li>
      </div>
        <div>
        <NewConnectionForm
        :page="page" :pages="pages"/>
      </div>

      </ul>
    </div>
  </template>
  
  <script>
  import ConnectionComponent from './ConnectionComponent.vue'
import NewConnectionForm from './NewConnectionForm.vue';
  
  export default {
    name: 'ConnectionListComponent',
    components: {
    ConnectionComponent,
    NewConnectionForm
},
    props: {
      page: {
        type: Object,
        required: true
      },
      pages: {
          type: Array,
          required: true
        }
    },
    data () {
      return {
        currentPage: null,
        connections: [],
        book: this.$store.state.currentBook
      }
    },
    mounted(){
      this.findConnections();
    },
    methods: {
        async findConnections(){
          // const book = this.$store.state.currentBook ?? '';
          // console.log("our params", this.page._id, "two", this.child._id, "thiree", this.text, "done");
          // const fields = {parent: this.page._id, child: this.child._id, text: this.text };
          const bookId = this.book ?? ''
          const response = await fetch(`/api/connection/?bookId=${bookId}`);
          console.log(response);

          if (!response.ok) {
                console.log("okay, you have an error");
                const res = await response.text();
                console.log(res);
                console.log("thing above this was your res");
                throw new Error(res.error);
      }

          const r = await response.text();
          const ldj =JSON.parse(r);
        },

    }
  }
  
  </script>
  