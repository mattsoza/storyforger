<!-- Reusable component to create a new book -->

<template>
  <div>
    <button @click="(newBookDialog=true)">New book</button>
    <v-easy-dialog v-model="newBookDialog">
      <NewBookForm />
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
      evt.preventDefault()

      const params = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: {
          title: 'evt.body',
          description: 'evt.target.description'
        }
      }

      console.log(evt)

      // fetch('/api/book', params)
      //   .then((res) => { res.json() })
      //   .then((data) => { console.log(data) })

      // this.newBookDialog = false
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
</style>
