<!-- Reusable component to edit a page -->

<script>
import BlockFormImage from '@/components/common/BlockFormImage.vue'

export default {
  name: 'ImageUploader',
  mixins: [BlockFormImage],
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
        { id: 'image', label: 'Upload Image' }
      ],
      title: 'Upload Image',
      callback: (res) => {
        this.$emit('updateSuccess')
        console.log(res)
        this.$store.commit('updatePage', res.page)
      }
    }
  }
}
</script>
