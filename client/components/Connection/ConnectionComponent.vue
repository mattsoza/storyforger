<template>
    <div>
      <b>{{connection.text}}</b>: From <b>{{this.parent.title}}</b> to <b>{{this.child.title}}</b>
      <!-- {{this.parent.title}} -> {{this.child.title}} -->
      <!-- <button>Edit Connection</button> -->
      <button @click="deleteConnection"> 🗑️ Delete Connection</button>
      <button @click="followConnection"> ➡️ Follow Connection</button>
      <button @click="openEdit"> ✏️ Edit Connection</button>
      
      
      
      <v-easy-dialog v-model="visible">
       <ConnectionEditor :connection="this.connection" :page="page" @connectionsChanged="closeEdit"/>
      </v-easy-dialog>
    </div>


    

</template>

<script>
import VEasyDialog from 'v-easy-dialog';
import ConnectionEditor from '@/components/Connection/ConnectionEditor.vue';

export default {
  name: 'ConnectionComponent',
  components: {
    VEasyDialog,
    ConnectionEditor
  },
  props: {
    connection: {
      type: Object,
      required: true
    },
    page: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      text: this.connection.text,
      child: false,
      parent: this.page,
      connectionId: this.connection._id,
      editing: false,
      visible: false
    }
  },
  mounted(){
    this.getChild();
  },
  methods: {
    getChild(){
      this.child = this.getPage(this.connection.child);
    },
    closeEdit(){
      this.visible = false;
    },
    openEdit(){
      this.visible=true;
    },
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
      this.$store.commit('updateCurrentPage', this.child)
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
      const pages = [].concat(this.$store.state.currentBook.pages) // Creates deep copy of array
      const index = pages.findIndex((p) => pageId === p._id)
      const page = pages[index]
      console.log(page)
      return page
    }
  }
}
</script>
