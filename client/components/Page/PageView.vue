<!-- Reusable component allowing you to edit a page -->

<template>
<div>
  <h2>{{ page.title }}</h2>
  <p>{{ page.text }}</p>
  <button @click="openEdit">Edit Page</button>
  <v-easy-dialog v-model="visible">
    <PageEditor :page="this.page" @updateSuccess="closeEdit"/>
  </v-easy-dialog>
  <!-- <router-link class="routerlink" to="/story">Edit Book</router-link> -->

  <ConnectionListComponent :page="page" :pages="pages" />

</div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import PageEditor from '@/components/Page/PageEditor.vue'
import ConnectionListComponent from '../Connection/ConnectionListComponent.vue'

export default {
  name: 'PageView',
  components: {
    VEasyDialog,
    PageEditor,
    ConnectionListComponent
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
      visible: false
    }
  },
  methods: {
    openEdit() {
      this.visible = true;
    },
    closeEdit() {
      this.visible = false;
    }
  }
}

</script>
