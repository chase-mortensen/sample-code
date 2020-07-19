new Vue({
  el: '#app',
  data: {
   counter: 0,
   secondCounter: 0,
   x: 0,
   y: 0
  },
  computed: {
    output: function() {
      console.log('output');
      return this.counter > 5 ? 'Giddy up' : 'Yee haw';
    },
    secondOutput: function() {
      console.log('secondOutput');
      return this.secondCounter > 7 ? 'Well well well' : 'bellllo';
    }
  },
  watch: {
    secondCounter: function(value) {
      var vm = this;
      setTimeout(function() {
        vm.secondCounter = 0;
      }, 3000);
    }
  },
  methods: {
    updateCoordinates: function(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    },
    alertMe: function() {
      alert('Alert!');
    }
  }
});
