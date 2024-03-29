import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.root = 'https://vuejs-http-959b5.firebaseio.com/data.json';

new Vue({
  el: '#app',
  render: h => h(App)
});
