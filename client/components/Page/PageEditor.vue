<!-- Reusable component to edit a page -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'PageEditor',
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
      method: 'PATCH',
      hasBody: true,
      fields: [
        { id: 'title', label: 'Title', value: this.page.title },
        { id: 'text', label: 'Text', value: this.page.text },
        { id: 'image', label: 'Upload Image' }
      ],
      title: 'Save',
      callback: (res) => {
        this.$emit('updateSuccess')
        console.log(res)
        this.$store.commit('updatePage', res.page)
      }
    }
  }
}
</script>
