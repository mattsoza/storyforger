<template>
    <div>
      <b>{{connection.text}}</b>: {{this.getPageName(this.child)}}
    </div>
</template>
  
  <script>
  export default {
    name: 'ConnectionComponent',
    props: {
      connection: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        text: this.connection.text,
        child: this.connection.child,
        connectionId: this.connection._id,
        editing: false
      }
    },
    methods: {
      editText (evt) {
        const params = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: { text: 'evt.body' }
        }
  
        fetch(`/api/connections/${this.connectionId}`, params)
          .then((res) => {})
      },
      deleteConnection (evt) {
        const params = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
  
        fetch(`/api/connections/${this.connectionId}`, params)
          .then((res) => { res.json() })
          .then((data) => { console.log(data) })
      },
      editChild (evt) {
        const params = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: { child: 'evt.body' }
        }
  
        fetch(`/api/connections/${this.connectionId}`, params)
          .then((res) => {})

      },
      getPageName(pageId) {
        let pages = [].concat(this.$store.state.currentBook.pages); // Creates deep copy of array
        const index = pages.findIndex((p) => pageId === p._id);
        const page = pages[index];
        console.log(page);
        return page.title;
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  