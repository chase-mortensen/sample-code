let data = {
  title: 'The VueJS Instance',
  showParagraph: false
};

let vm1 = new Vue({
  el: '#app1',
  data: data,
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle('The VueJS Instance (Updated)');
      // console.log(this.$refs);
      this.$refs.myButton.innerText = 'Test';
    },
    updateTitle: function(title) {
      this.title = title;
    },
  },
  computed: {
    lowerCaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: function(value) {
      alert('Title changed, new value: ' + value);
    }
  }
});

// console.log(vm1.$data === data);
vm1.$refs.header1.innerText = 'Something else';

setTimeout(function() {
  vm1.title = 'Changed by timer';
  vm1.show();
}, 2000);

let vm2 = new Vue({
  el: '#app2',
  data: {
    title: 'The second instance'
  },
  methods: {
    onChange: function() {
      vm1.title = 'Changed!';
    }
  }
});