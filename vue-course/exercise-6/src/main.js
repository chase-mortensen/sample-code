import Vue from 'vue';
import App from './App.vue';

import Footer from './Footer.vue';
import Header from './Header.vue';
import Dashboard from './Dashboard.vue';

Vue.component('app-footer', Footer);
Vue.component('app-header', Header);
Vue.component('app-dashboard', Dashboard);

new Vue({
  el: '#app',
  render: h => h(App)
})
