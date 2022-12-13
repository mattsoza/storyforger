<template>
    <div>
      <b>{{connection.text}}</b>: {{this.getPage(this.child).title}}
      <!-- <button>Edit Connection</button> -->
      <button @click="deleteConnection">Delete Connection</button>
      <button @click="followConnection">Follow Connection</button>
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

      fetch(`/api/connection/${this.connectionId}`, params)
        .then((res) => {})
    },
    async deleteConnection (evt) {
      const params = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      console.log("deleting");
      const response = await fetch(`/api/connection/${this.connectionId}`, params);
      console.log("deleted");
      this.$emit('connectionsChanged');
    },
    followConnection () {
      this.$store.commit('updateCurrentPage', this.getPage(this.child))
    },
    editChild (evt) {
      const params = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: { child: 'evt.body' }
      }

      fetch(`/api/connection/${this.connectionId}`, params)
        .then((res) => {})
    },
    getPage (pageId) {
      let pages = [].concat(this.$store.state.currentBook.pages) // Creates deep copy of array
      const index = pages.findIndex((p) => pageId === p._id)
      const page = pages[index]
      console.log(page)
      return page
    }
  }
}
</script>
