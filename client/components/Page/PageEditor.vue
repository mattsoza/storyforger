<!-- Reusable component allowing you to edit a page -->

<!-- TODO: Rewrite this to make it a blockform. Would simplify formatting for now and could be styled later -->
<template>
  <form>
    <label for="title">
      Title
      <input type="text">
    </label>
    <label for="">
      Text
      <input type="textarea">
    </label>
  </form>
</template>

<script>

export default {
  name: 'PageEditorComponent',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  methods: {
    
  }
}

</script>