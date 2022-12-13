<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <ul>
        <!-- Our connections are: {{findPageConnections()}}  -->
        <!-- {{connections}}. -->
        Travel from this Page to any other pages listed below!

        <!-- <button @click="updateConnections">Click here to findPageConnections</button> -->
        <div v-if="(pages.length!==0 && pages.length!==1)">

        <li
        v-for="connection in page.connections"
        :key="connection._id"
        :connection="connection"
        > <ConnectionComponent
            :connection="connection"
            @connectionsChanged="updateConnections"
        /></li>
      </div>
        <div>
        Link {{page.title}} to new Page
        <NewConnectionForm
        :page="page" :pages="pages"
        @connectionsChanged="updateConnections"/>
      </div>

      </ul>
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
