// let data = { status: 'Critical' }

Vue.component('my-server-status', {
  data: function() {
    // return data;

    return { status: 'Critical'}
  },
  template: '<p>Server Status: {{ status }} <button @click="changeStatus">Change status</button></p>',
  methods: {
    changeStatus: function() {
      this.status = 'Normal';
    }
  }
});

new Vue({
  el: '#app',
});