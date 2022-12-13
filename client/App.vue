<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar },
  beforeCreate () {
    fetch('/api/users/session', {
      credentials: 'same-origin' // sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user
      this.$store.commit('setUsername', user ? user.username : null)
    })
  }
}
</script>

<style>
body {
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
}
</style>
