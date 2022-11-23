<!-- Reusable component to represent a login -->
<!-- Thanks to 6.1040 staff for providing framework for this :) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: "LoginForm",
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'POST',
      setUsername: true,
      hasBody: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Create account',
      callback: () => {
        this.$router.push({name: 'MyStories'});
      }
    }
  }
  
}
</script>