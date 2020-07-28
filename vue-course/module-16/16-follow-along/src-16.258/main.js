import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes.js';

Vue.use(VueRouter);

// this syntax creates a key/value with the same name
//  routes: routes
const router = new VueRouter({ 
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 900};
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
}); 

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
