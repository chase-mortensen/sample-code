import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-http-959b5.firebaseio.com/data.json';
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == 'POST') { // appends with unique identifier
    request.method = 'PUT'; // overwrites old data
  }

  next(response => {
    response.json = () => { return { messages: response.body } };
  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
