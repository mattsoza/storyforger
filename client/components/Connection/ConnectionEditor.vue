<!-- Reusable component to edit a page -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'ConnectionEditor',
  mixins: [BlockForm],
  props: {
    connection: {
      type: Object,
      required: true
    },
    page: {
        type: Object,
        required: true
    }
  },
  data () {
    return {
      url: `/api/connection/${this.connection._id}`,
      previewImage: null,
      method: 'PATCH',
      hasBody: true,
      fields: [
        { id: 'text', label: 'Text', value: this.connection.text },
      ],
      title: 'Edit Connection Text',
      callback: (res) => {
        this.$emit('connectionsChanged');
        console.log(res);
        this.$store.commit('updateConnections', this.page._id)
      }
    }
  },

}
</script>
