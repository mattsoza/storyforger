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
import LoginForm from '@/components/Login/LoginForm.vue';
import SignupForm from '@/components/Login/SignupForm.vue';

export default {
  name: 'LoginPage',
  data() {
    return {
      currentAction: null,
    }
  },
  components: {LoginForm, SignupForm},
  methods: {
    openLogin() {
      this.currentAction = 'login';
    },
    openSignup() {
      this.currentAction = 'signup';
    }
  }
};
</script>

<style lang="scss">

  h1 {
    font-size: 4em;
    margin-bottom: 0rem;
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
    font-size: 1.5em;
    padding: .4rem .6rem .4rem .6rem;
    border-radius: 10px;

    &.signup {
      background-color: #4DBCEC;
      color: white;
    }

    &.signup:hover {
      background-color: #3D95BA;
    }

    &.login {
      
    }
  }
</style>