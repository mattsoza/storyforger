<!-- Reusable component allowing you to edit a page -->

<!-- TODO: Rewrite this to make it a blockform. Would simplify formatting for now and could be styled later -->
<template>
<div>
  <h2>{{ page.title }}</h2>
  <p>{{ page.text }}</p>
  <button @click="(visible=true)">Edit</button>
  <v-easy-dialog model="visible" @updateSuccess="(visible=false)">
    <PageEditor :page="this.page" />
  </v-easy-dialog>
</div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import PageEditor from '@components/Page/PageEditor.vue'

export default {
  name: 'PageView',
  components: {
    VEasyDialog,
    PageEditor
  },
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  methods: {
    openEdit () {

    }
  }
}

</script>
