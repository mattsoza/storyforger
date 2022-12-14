<!-- Reusable component showing a page of the book -->

<template>
  <div id="background">
    <!-- <h3 class="pageTitle">{{ this.$store.state.currentPage.title }}</h3> -->
    <div id="viewBook" :class="{ fadeIn: fading }">
      <img
      v-bind:src="this.$store.state.currentPage.image"
      class="pageImage"
      />
      <h4 class="pageText">{{ this.$store.state.currentPage.text }}</h4>
      <div class="navLinks">
        <a
        class="storyNavLink"
        v-for="connection in this.$store.state.currentPage.connections"
        :key="connection._id"
        @click="nextPage(connection)"
        >
          {{ connection.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  data () {
    return {
      book: this.$store.state.currentBook,
      fading: false
    }
  },
  methods: {
    nextPage (connection) {
      // Changes currentPage in store
      this.$store.commit('updateCurrentPageId', connection.child)

      // Fades in the next page
      this.fading = true
      setTimeout(() => {
        this.fading = false
      }, 400)
    }
  }
}

</script>

<style>

div#background {
  background-color: black;
}

div#viewBook {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fadeIn {
  animation: fadeIn ease .3s;
}

@keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}

div.navLinks {
  display: flex;
  flex-direction: row;
}

h3.pageTitle {
  font-size: 3em;
  color: white;
}

h4.pageText {
  color: white;
  font-size: 1.3em;
}

.pageImage {
  max-height: 70vh;
}

a.storyNavLink {
  display: inline-block;
  margin: 1em 4em 2em 4em;
}

</style>
