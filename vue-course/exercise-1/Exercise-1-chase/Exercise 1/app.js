new Vue({
  el: '#exercise',
  data: {
    name: 'Chase',
    age: 26,
    image: 'https://s3-eu-west-1.amazonaws.com/oceanographic/wp-content/uploads/2020/05/22100836/nodule-mining-1-IMAGE-WILLYAM.jpg'
  },
  methods: {
    randomFloat: function() {
      return Math.random();
    }
  }
})