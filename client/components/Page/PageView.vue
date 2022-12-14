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
        <p>You don't have an image for this page yet.</p>
        <button @click="openImage">Add Image</button>
      </div>

    
    <div>
      <p v-if="page.text.length!=0">{{ page.text }}</p>
      <p v-else>You don't have a caption for this page yet. <button @click = "openText">Add Text</button></p>
    </div>

    <v-easy-dialog v-model="visible">
      <PageEditor :page="this.page" @updateSuccess="closeEdit"/>
    </v-easy-dialog>
    <v-easy-dialog v-model="imageUpload">
      <ImageUploader :page="this.page" @updateSuccess="closeImage"/>
    </v-easy-dialog>
    <v-easy-dialog v-model="deleteDialog">
      <PageDelete :page="this.page" @deleteSuccess="closeDelete"></PageDelete>
    </v-easy-dialog>
    <v-easy-dialog v-model="textUpload">
      <TextEditor :page="this.page" @updateSuccess="closeText"></TextEditor>
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
import ImageUploader from '@/components/Page/ImageUploader.vue'
import TextEditor from '@/components/Page/TextEditor.vue'

export default {
  name: 'PageView',
  components: {
    VEasyDialog,
    PageEditor,
    PageDelete,
    ConnectionListComponent,
    ConnectionComponent,
    ImageUploader,
    TextEditor
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
      deleteDialog: false,
      textUpload: false
    }
  },
  methods: {
    openEdit () {
      this.visible = true;
    },
    openText(){
      this.textUpload = true;
    },
    closeText(){
      this.textUpload = false;
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
  background: #dddddd;
  margin-left: auto;
  border-radius: .6em;
  padding: .6em;
  height: 100%;
}

img {
  object-fit: scale-down;
  width: 100%;
  max-width: 40em;
  max-height: 40em;
}

.pageInformation {
  background: #dddddd;
  width: 100%;
  flex-shrink: 4;
  margin-right: 2.5%;
  border-radius: .6em;
  padding: .6em;
  height: 100%;
}

.view {
  display: flex;
}

p {
  margin: .6em .4em;
}
</style>
