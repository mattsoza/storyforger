<!-- Reusable component to create a new book -->

<template>
  <div>
    <button class="newBookButton" @click="(newBookDialog=true)">New book</button>
    <v-easy-dialog v-model="newBookDialog">
      <NewBookForm @newBookCreated="(newBookDialog=false)"/>
    </v-easy-dialog>
  </div>
</template>

<script lang="ts">
import VEasyDialog from 'v-easy-dialog'
import NewBookForm from '@/components/Book/NewBookForm.vue'

export default {
  name: 'NewBookComponent',
  components: {
    VEasyDialog,
    NewBookForm
  },
  data () {
    return {
      newBookDialog: false
    }
  },
  methods: {
    createNewBook (evt) {
      /**
       * Creates a new book for this user
       */
      
    }
  }
}
</script>

<style>
.v-easy-dialog--backdrop-btn {
  background-color: transparent;
}

.v-easy-dialog--content-container {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.newBookButton {
  font-size: 1.4em;
  margin: auto;
  width: 80%;
  text-align: center;
  padding: .4em 0 .4em 0;
  display: block;
}
</style>
