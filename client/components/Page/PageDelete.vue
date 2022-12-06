<!-- Reusable component to delete a page -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'PageDelete',
  mixins: [BlockForm],
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      url: `/api/page/${this.page._id}`,
      previewImage: null,
      method: 'DELETE',
      hasBody: true,
      fields: [],
      title: 'Delete Page',
      content: "Are you sure you want to delete this page? This page's text and image will be lost.",
      callback: (res) => {
        this.$emit('deleteSuccess')
        console.log(res)
        if (res.message === 'Page deleted.') {
          this.$store.commit('deletePage', this.page)
        }
      }
    }
  }
}
</script>
