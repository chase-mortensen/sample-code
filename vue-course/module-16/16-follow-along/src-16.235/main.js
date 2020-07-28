import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes.js';

Vue.use(VueRouter);

// this syntax creates a key/value with the same name
//  routes: routes
const router = new VueRouter({ routes }); 

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
