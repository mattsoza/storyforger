<template>
    <div class="connection">
      <div class="connectionText">
       <p><b>{{connection.text}}</b> (to <b :class="{missingPage: !child}">{{(getChild()) ? getChild() : "MISSING PAGE"}}</b>)</p> 
      </div>

      <div class="buttons">
        <button @click="deleteConnection"> 🗑️ Delete</button>
        <button @click="followConnection"> ➡️ Follow</button>
        <button @click="openEdit"> ✏️ Edit</button>
      </div>
      <v-easy-dialog v-model="visible">
       <ConnectionEditor :pages="pages" :connection="connection" :page="page" @connectionsChanged="closeEdit"/>
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
    pages:{
      type: Array,
      required: true
    }
  },
  data () {
    return {
      text: this.connection.text,
      child: null,
      childName: "",
      parent: this.page,
      connectionId: this.connection._id,
      editing: false,
      visible: false,
    }
  },
  mounted () {
    this.getChild()
  },
  methods: {
    getChild () {
      const pageId = this.connection.child;
      const book = this.$store.state.currentBook;
      let pages = [].concat(book.pages); // Creates deep copy of array
      const idx = pages.findIndex((p) => p._id === pageId);
      // this.idx = idx;
      const child = pages[idx];
      this.child = child;
      if (this.child == null){ return null}
      this.childName=this.child.title;
      // console.log(this.childName);
      return child.title + ""
    },
    closeEdit () {
      // this.getChild();
      this.visible = false;
    },
    openEdit () {
      this.visible = true
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
      console.log('deleting')
      const response = await fetch(`/api/connection/${this.connectionId}`, params);
      console.log('deleted')
      this.$emit('connectionsChanged')
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

<style scoped>

.missingPage {
  color: red;
}

.connection {
  display: flex;
}

.connectionText {
  
}

button {
  margin-left: auto;
}

.buttons {
  margin-left: auto;
  display: flex;
}

p {
  margin: 0;
}

</style>