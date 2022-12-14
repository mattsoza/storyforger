<!-- Reusable component to edit a page -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'TextEditor',
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
        { id: 'text', label: 'Text', value: this.page.text },
      ],
      title: 'Add Text',
      callback: (res) => {
        this.$emit('updateSuccess')
        console.log(res)
        this.$store.commit('updatePage', res.page)
      }
    }
  }
}
</script>
