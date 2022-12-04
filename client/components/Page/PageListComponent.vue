<!-- Component that displays all the pages of a book -->

<template>
  <ul>
    <li
    v-for="page in pages"
    :key="page._id"
    @click="selectPage"
    >{{ page.title }}</li>
  </ul>
</template>

<script>

export default {
  name: 'PageListComponent',
  props: {
    // The array containing all the page objects. Calculated upon opening book?
    pages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: null
    }
  },
  methods: {
    // TODO: finish writing out this function. Should assign this.currentPage and $emit (unless page edit is a child of it...)
    selectPage (evt) {
      console.log(evt)
    }
  }
}

</script>
