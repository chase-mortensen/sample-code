import Vue from 'vue';
import App from './App.vue';

import Footer from './components/shared/Footer.vue';
import Header from './components/shared/Header.vue';
import Dashboard from './components/server/Dashboard.vue';

Vue.component('app-footer', Footer);
Vue.component('app-header', Header);
Vue.component('app-dashboard', Dashboard);

new Vue({
  el: '#app',
  render: h => h(App)
})
