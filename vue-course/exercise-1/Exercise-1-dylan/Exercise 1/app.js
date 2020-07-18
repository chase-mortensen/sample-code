new Vue({
  el: "#exercise",
  data: {
    name: "Dylan",
    age: 17,
    img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg"
  },
  methods: {
    randomNum: function() {
      return Math.random();
    }
  }

})
