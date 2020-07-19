new Vue({
  el: '#app',
  data: {
    title: 'Hello, World!',
    link: 'https://www.google.com/',
    finishedLink: '<a href=\'https://www.google.com/\'>Google</a>',
  },
  methods: {
    sayHello: function() {
      this.title = "Hello!";
      return this.title;
    }
  }
});
