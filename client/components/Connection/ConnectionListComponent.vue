<!-- Component that displays all the pages of a book -->

<template>
    <div>
      <ul>
        Current Connections
        <li
        v-for="connection in connections"
        :key="connection._id"
        :connection="connection"
        > <ConnectionComponent 
            :connection="connection"
        /></li>
      </ul>
    </div>
  </template>
  
  <script>
  import ConnectionComponent from './ConnectionComponent.vue'
  
  export default {
    name: 'ConnectionListComponent',
    components: {
      ConnectionComponent
    },
    props: {
      // The array containing all the page objects. Calculated upon opening book?
      page: {
        type: Object,
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
  