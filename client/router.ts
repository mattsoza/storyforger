// Thanks to 6.1040 staff for providing basic router code

import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginPage from './components/Login/LoginPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import HomePage from './components/Home/HomePage.vue';
import ImageUploadComponent from './components/Page/ImageUploadComponent.vue';
import BookPage from './components/Book/BookPageComponent.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/login', name: 'Login', component: LoginPage},
    {path: '/my-stories', name: 'My Stories', component: BookPage},
    {path: '/account', name: 'Account', component: AccountPage},
    {path: '/image', name: "Image Upload", component: ImageUploadComponent}
]

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    console.log(router.app.$store.state.username)
    if ((to.name === 'Login' || to.name === 'Home') && router.app.$store.state.username) {
      next({name: 'My Stories'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }
    if ((to.name === 'Account' || to.name === 'My Stories') && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});
  
export default router;