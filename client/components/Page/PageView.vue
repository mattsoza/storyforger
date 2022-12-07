<!-- Reusable component allowing you to edit a page -->

<template>
<div>
  <h2>{{ page.title }}</h2>
  <img
    v-if="page.image"
    v-bind:src="page.image" height="300">
  <p>{{ page.text }}</p>
  <button @click="openEdit">Edit Page</button>
  <button @click="openDelete">Delete Page</button>
  

  <v-easy-dialog v-model="visible">
    <PageEditor :page="this.page" @updateSuccess="closeEdit"/>
  </v-easy-dialog>
  <v-easy-dialog v-model="deleteDialog">
    <PageDelete :page="this.page" @deleteSuccess="closeDelete"></PageDelete>
  </v-easy-dialog>
  <!-- <router-link class="routerlink" to="/story">Edit Book</router-link> -->

  <ConnectionListComponent :page="page" :pages="pages" />

</div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import PageEditor from '@/components/Page/PageEditor.vue'
import PageDelete from '@/components/Page/PageDelete.vue'
import ConnectionListComponent from '../Connection/ConnectionListComponent.vue'
import ConnectionComponent from '../Connection/ConnectionComponent.vue'

export default {
  name: 'PageView',
  components: {
    VEasyDialog,
    PageEditor,
    PageDelete,
    ConnectionListComponent,
    ConnectionComponent
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
      visible: false,
      deleteDialog: false
    }
  },
  methods: {
    openEdit () {
      this.visible = true
    },
    closeEdit () {
      this.visible = false
    },
    openDelete () {
      this.deleteDialog = true
    },
    closeDelete () {
      this.deleteDialog = false
    }
  }
}

</script>
