<!-- Component representing login and signup page -->

<template>
  <div id="frontPage">
    <h1>
      Welcome to Story Forger!
    </h1>
    <h2>
      Make choose-your-own-adventure books with ease!
    </h2>
    <div id="buttons">
      <button class="acct signup">Sign-in</button>
      <button class="acct login">Login</button>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue';
import SignupForm from '@/components/Login/SignupForm.vue';

export default {
  name: 'LoginPage',
  components: {LoginForm, SignupForm}
};
</script>

<style lang="scss">

  h1 {
    font-size: 4em;
    margin-bottom: 0rem;
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