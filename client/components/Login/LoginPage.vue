<!-- Component representing login and signup page -->

<template>
  <div id="frontPage">
    <h1>
      Welcome to Story Forger!
    </h1>
    <h2>
      Make choose-your-own-adventure books with ease!
    </h2>
    <button id="signin">Sign-in</button>
    <button id="login">Login</button>
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