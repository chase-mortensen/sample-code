new Vue({
  el: "#exercise",
  data: {
    v1: "tee hee",
    v2: "",
  },
  methods: {
    alarm: function() {
      alert("Alert!");
    },
    storeV1: function(event) {
      this.v1=event.target.value;
    },
    storeV2: function(event) {
      this.v2=event.target.value;
    },
  }
})