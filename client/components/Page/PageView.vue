<!-- Reusable component allowing you to edit a page -->

<template>
<div class="view">
  <div class="pageInformation">
    <h2>
      {{ page.title }}
      <button @click="openEdit">✏️ Edit Page </button>
      <button v-if="this.page._id !== this.$store.state.currentBook.firstPage" @click="openDelete">🗑️ Delete Page</button>
    </h2>

      <img v-if="page.image" v-bind:src="page.image">
      <div v-else class="no_img">
        <p>Oh no! This Page has no Image!</p>
        <button @click="openImage">Add Image</button>
      </div>

    <p>{{ page.text }}</p>

    <v-easy-dialog v-model="visible">
      <PageEditor :page="this.page" @updateSuccess="closeEdit"/>
    </v-easy-dialog>
    <v-easy-dialog v-model="imageUpload">
      <ImageUploader :page="this.page" @updateSuccess="closeEdit"/>
    </v-easy-dialog>
    <v-easy-dialog v-model="deleteDialog">
      <PageDelete :page="this.page" @deleteSuccess="closeDelete"></PageDelete>
    </v-easy-dialog>
  </div>

  <ConnectionListComponent class="connectionList" :page="page" :pages="pages" />
</div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import PageEditor from '@/components/Page/PageEditor.vue'
import PageDelete from '@/components/Page/PageDelete.vue'
import ConnectionListComponent from '../Connection/ConnectionListComponent.vue'
import ConnectionComponent from '../Connection/ConnectionComponent.vue'
import ImageUploader from '@/components/Page/ImageUploader'

export default {
  name: 'PageView',
  components: {
    VEasyDialog,
    PageEditor,
    PageDelete,
    ConnectionListComponent,
    ConnectionComponent,
    ImageUploader
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
      imageUpload: false,
      deleteDialog: false
    }
  },
  methods: {
    openEdit () {
      this.visible = true;
    },
    openImage (){
      this.imageUpload = true;
    },
    closeImage (){
      this.imageUpload = false;
    },
    closeEdit () {
      this.visible = false;
    },
    openDelete () {
      this.deleteDialog = true;
    },
    closeDelete () {
      this.deleteDialog = false;
    }
  }
}

</script>

<style scoped>
.no_img{
  border: 2px solid black;
  /* outline: #4CAF50 solid 10px; */  
  padding: 20px;
  /* height:5; */
}

.connectionList {
  max-width: 41em;
  width: 80%;
  background: #eeeebb;
  margin-right: 0;
  margin-left: 1%;
}

img {
  object-fit: scale-down;
  width: 100%;
  max-width: 50em;
  max-height: 50em;
}

.pageInformation {
  background: #eebbee;
  width: auto;
  flex-shrink: 4;
}

.view {
  display: flex;
}
</style>
