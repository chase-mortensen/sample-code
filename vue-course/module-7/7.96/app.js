// let data = { status: 'Critical' }

let myServerStatus = {
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
};

new Vue({
  el: '#app1',
  components: { // local. use Vue.component for global
    'my-server-status': myServerStatus
  }
});

new Vue({
  el: '#app2',
});