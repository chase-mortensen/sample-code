Vue.component('my-server-status', {
  data: function() {
    return {
      status: 'Critical',
    }
  },
  template: '<p>Server Status: {{ status }}</p>'
});

new Vue({
  el: '#app',
  // data: {
  //   status: 'Critical'
  // },
  // template: '<p>Server Status: {{ status }}</p>'
});