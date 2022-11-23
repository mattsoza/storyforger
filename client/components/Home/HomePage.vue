<template>
  <h2>Welcome to StoryForger<span v-if="$store.state.username">, {{$store.state.username}}</span>!</h2>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>