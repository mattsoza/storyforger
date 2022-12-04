<!-- Component that displays all the pages of a book -->

<template>
  <div>
    <ul>
      <li
      v-for="page in pages"
      :key="page._id"
      :page="page"
      @click="(currentPage=page)"
      >{{ page.title }}</li>
    </ul>
    <PageView :page="currentPage" />
  </div>
</template>

<script>
import PageView from './PageView.vue'

export default {
  name: 'PageListComponent',
  components: {
    PageView
  },
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
  }
}

</script>
