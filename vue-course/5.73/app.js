let data = {
  title: 'The VueJS Instance',
  showParagraph: false
};

let vm1 = new Vue({
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

vm1.$mount('#app1');

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

let vm3 = new Vue({
  template: '<h1>Hello!</h1>',
});

// vm3.$mount('#app3');

// below is uncommon method. setting 'el' property or mount to id more common.
vm3.$mount();
document.getElementById('app3').appendChild(vm3.$el);
