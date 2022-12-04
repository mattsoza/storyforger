<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    
    <div class="right">
      <p v-if="$store.state.username"> {{$store.state.username}}</p>
      <router-link
        v-if="$store.state.username"
        to="/account"
        :class="{current: $route.name === 'Account'}"
      >
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
        :class="{current: $route.name === 'Login'}"
      >
        Login
      </router-link>
      <router-link
        to="/image"
        :class="{current: $route.name === 'Image Upload'}"
      >
        Image Upload
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: .5vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}

a {
  padding: .7em;
  border-radius: 10px;
  background-color: #9bf;
  color: #000;
  text-decoration: none;
}

.current{
  background-color: #48f;
  
}
</style>
