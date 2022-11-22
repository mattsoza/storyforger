// Thanks to 6.1040 staff for providing basic router code

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home', component: homePage},
    {path: '/my-stories', name: 'MyStories', component: StoryHome},
    {path: '/account', name: 'Account', component: AccountPage},
    {path: '/login', name: 'Login', component: LoginPage}
]

const router = new VueRouter({routes})

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
 router.beforeEach((to, from, next) => {
    if (router.app.$store) {
      if (to.name === 'Login' && router.app.$store.state.username) {
        next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
        return;
      }

      if (to.name === 'Home' && router.app.$store.state.username) {
        next({name: 'MyStories'});
        return;
      }
  
      if (to.name === 'Account' && !router.app.$store.state.username) {
        next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
        return;
      }
    }
  
    next();
  });
  
  export default router;