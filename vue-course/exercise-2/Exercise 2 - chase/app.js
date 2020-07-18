new Vue({
  el: '#exercise',
  data: {
    value1: "",
    value2: ""
  },
  methods: {
    showAlert: function() {
      alert('Alert!');
    },
    updateValue1: function(event) {
      this.value1 = event.target.value;
    },
    updateValue2: function(event) {
      this.value2 = event.target.value;
    }
  }
})