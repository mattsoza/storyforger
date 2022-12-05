<!-- Form for creating a new book -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'NewBookForm',
  mixins: [BlockForm],
  data () {
    return {
      url: '/api/book',
      method: 'POST',
      setUsername: true,
      hasBody: true,
      fields: [
        { id: 'title', label: 'Title', value: '' },
        { id: 'summary', label: 'Summary (optional)', value: '' }
      ],
      title: 'New Book',
      callback: () => {
        this.$router.push({ name: 'My Stories' });
        this.$store.commit('getBooks');
      }
    }
  }
}
</script>
