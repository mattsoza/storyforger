<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <h2>Travel from this page to any other page listed below!</h2>
      <ul>
        <li
          v-for="connection in page.connections"
          :key="connection._id"
          :connection="connection"
        >
          <ConnectionComponent
            :connection="connection"
            :page="page"
            :pages="pages"
            @connectionsChanged="updateConnections"
          />
        </li>
      </ul>
      <div class="newConnection">
        <p>Create a new connection from <b>{{page.title}}</b> to another page:</p>
        <NewConnectionForm
        :page="page" :pages="pages"
        @connectionsChanged="updateConnections"/>
      </div>

    </div>
  </template>

<script>
import ConnectionComponent from './ConnectionComponent.vue'
import NewConnectionForm from './NewConnectionForm.vue'

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
    this.updateConnections()
  },
  methods: {
    async updateConnections() {
      console.log("updating");
      this.$store.commit('updateConnections', this.page._id)
    }
  }
}

</script>

<style scoped>

ul>li {
  border: 1px solid black;
  margin: .2em 0;
  padding: .4em;
  border-radius: .4em;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.newConnection {
  display: flex;
}

p {
  margin: 0 .5em 0 0;
}

</style>