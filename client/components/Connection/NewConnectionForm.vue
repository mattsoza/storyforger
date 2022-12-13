<!-- Form for creating a new connection -->
<template>
  <div>
    <select v-model = "child" class="form-control" name="child">
      <option v-for="childOption in pages" :value="childOption">{{childOption.title}}</option>
    </select>

    <div v-if="child">
      <button @click="createConnection">Create Connection</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NewConnectionForm',
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
      child: null,
      text: 'New Connection'
    }
  },
  methods: {
    async createConnection () {
      // const book = this.$store.state.currentBook ?? '';
      console.log('our params', this.page._id, 'two', this.child._id, 'thiree', this.text, 'done')
      const fields = { parent: this.page._id, child: this.child._id, text: this.text }
      const response = await fetch(`/api/connection/`, { method: 'POST', body: JSON.stringify(fields), headers: { 'Content-Type': 'application/json' } })
      console.log(response)

      if (!response.ok) {
        console.log('okay, you have an error')
        const res = await response.text()
        console.log(res)
        console.log('thing above this was your res')
        throw new Error(res.error)
      }
      const r = await response.text()
      const ldj = JSON.parse(r)
      this.$emit('connectionsChanged')
    }
  }
}
</script>
