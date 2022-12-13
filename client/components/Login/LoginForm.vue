<!-- Reusable component to represent a login -->
<!-- Thanks to 6.1040 staff for providing framework for this :) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue'

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data () {
    return {
      url: '/api/users/session',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        { id: 'username', label: 'Username', value: '' },
        { id: 'password', label: 'Password', value: '' }
      ],
      title: 'Login',
      callback: () => {
        this.$router.push({ name: 'My Stories' })
      }
    }
  }

}
</script>
