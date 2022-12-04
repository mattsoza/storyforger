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
      method: 'PATCH',
      hasBody: true,
      fields: [
        { id: 'title', label: 'Title', value: this.page.title },
        { id: 'text', label: 'Text', value: this.page.text }
      ],
      title: 'Edit Page',
      callback: () => {
        this.$emit('updateSuccess')
      }
    }
  }
}
</script>
