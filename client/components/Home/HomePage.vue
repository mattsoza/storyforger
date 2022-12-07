<template>
  <h2>Welcome to StoryForger<span v-if="$store.state.username">, {{$store.state.username}}</span>!</h2>
</template>

<script>
export default {
    name: 'HomePage',
    mounted() {
      if (this.$store.state.username) {
        this.$router.push({ name: 'My Stories' });
      } else {
        this.$router.push({ name: 'Login'});
      }
    }
}
</script>