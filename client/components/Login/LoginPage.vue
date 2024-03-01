<!-- Component representing login and signup page -->

<template>
  <div id="frontPage">
    <h1>
      Welcome to Story Forger!
    </h1>
    <h2>
      Make choose-your-own-adventure books with ease!
    </h2>

    <div
    id="buttons"
    v-if="currentAction===null"
    >
      <button @click="openSignup" class="acct signup">Signup</button>
      <button @click="openLogin" class="acct login">Login</button>
    </div>
    <div
    v-else-if="currentAction==='signup'"
    >
      <SignupForm />
      <h3>Already have an account? <a @click="openLogin">Login</a> instead.</h3>
    </div>
    <div
    v-else-if="currentAction==='login'"
    >
      <LoginForm />
      <h3>Need an account? <a @click="openSignup">Signup</a> instead</h3>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue'
import SignupForm from '@/components/Login/SignupForm.vue'

export default {
  name: 'LoginPage',
  data () {
    return {
      currentAction: null
    }
  },
  components: { LoginForm, SignupForm },
  methods: {
    openLogin () {
      this.currentAction = 'login'
    },
    openSignup () {
      this.currentAction = 'signup'
    }
  },
  mounted () {
    if (this.$store.state.username) {
      this.$router.push({ name: 'My Stories' })
    }
  }
}
</script>

<style lang="scss">

  h1 h2 button {
    font-family: Arial, Helvetica, sans-serif;
  }

  h1 {
    font-size: 4em;
    margin-bottom: 0rem;
    text-align: center;
  }

  h2 {
    margin-top: .2em;
  }

  a {
    color: #4DBCEC;
    cursor: pointer;
  }

  a:hover {
    color: #3D95BA;
  }

  #frontPage {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #buttons {
    display: flex;
    width: 30%;
    justify-content: space-around;
  }

  .acct {
    font-size: 2em;
    padding: .6rem 1rem .6rem 1rem;
    border-radius: 5px;

    &.signup {
      background-color: white;
      color: #3396ff;
      border: 4px solid #3396ff;
      transition: .2s;
    }

    &.signup:hover {
      background-color: #3396ff;
      color: white;
      transition: .2s;
    }

    &.login {
      border: 4px solid black;
      background-color: white;
      transition: .2s
    }
    &.login:hover {
      background-color: black;
      color:white;
    }
  }
</style>
