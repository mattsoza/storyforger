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
    },
    pages: {
        type: Array,
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
        { id: 'connection', label: 'Connection', value: this.connection.child },

      ],
      title: 'Edit Connection',
      callback: (res) => {
        this.$store.commit('updateConnections', this.page._id);
        this.$emit('connectionsChanged');
        console.log(res);
      }
    }
  },

}
</script>
