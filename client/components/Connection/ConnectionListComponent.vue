<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <ul>
        You're in the Connection List Component
        <div>
        Here's the list:
        
        <li
        v-for="connection in connections"
        :key="connection._id"
        :connection="connection"
        > <ConnectionComponent 
            :connection="connection"
        /></li>
      </div>
        <div>
        Here's where to add a new Connection:


        <NewConnectionForm
        :page="page" :pages="pages"/>
      </div>

      <div>

        wour pages: {{pages}}

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
        currentPage: null
      }
    }
  }
  
  </script>
  