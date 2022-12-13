<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <ul>
        <!-- Our connections are: {{findPageConnections()}}  -->
        <!-- {{connections}}. -->
        <h2>Travel from this Page to any other pages listed below!</h2>
        

        <!-- <button @click="findPageConnections">Click here to findPageConnections</button> -->
        <div v-if="(pages.length!==0 && pages.length!==1)">

        <li
        v-for="connection in page.connections"
        :key="connection._id"
        :connection="connection"
        > <ConnectionComponent 
            :connection="connection"
            :page="page"
        /></li>
      </div>
        <div>
        <h3> Create a new connection from <b>{{page.title}}</b> to another page </h3>
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
      connections: [],
      book: this.$store.state.currentBook
    }
  },
  mounted () {
    this.findPageConnections()
  },
  methods: {
    async findBookConnections () {
      console.log('find book connections')
      const bookId = this.book._id
      console.log(bookId)
      const response = await fetch(`/api/connection/?pageId=${bookId}`)
      console.log(response)

      if (!response.ok) {
        console.log('okay, you have an error')
        const res = await response.text()
        console.log(res)
        console.log('thing above this was your res')
        throw new Error(res.error)
      }

      const r = await response.json()
      console.log('our list of connections:', r)
      this.connections = r
    },
    async findPageConnections () {
      const pageId = this.page._id
      const response = await fetch(`/api/connection/?pageId=${pageId}`)
      if (!response.ok) {
        const res = await response.text()
        throw new Error(res.error)
      }
      const r = await response.json()
      this.connections = r
    }
  }
}

</script>
