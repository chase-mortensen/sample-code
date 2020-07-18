new Vue({
  el: '#exercise',
  data: {
    effectStarted: false,
    highlight: null,
    whiteText: true,
    blue: true,
    blueClass: 'blue',
    userClass: 'red',
    isSquare: true,
    hasStyle: false,
    progress: 0,
    barTotalPx: 1600
  },
  computed: {
    currentEffect: function() {
      if (this.highlight === null) {
        return;
      }
      return {
        highlight: this.highlight,
        shrink: !this.highlight
      }
    },
    myClass: function() {
      return {
        box: true,
        // longBox: true,
        red: this.userClass === 'red',
        blue: this.userClass === 'blue',
        green: this.userClass === 'green',
        purple: this.userClass === 'purple'
      }
    },
    mySecondClass: function() {
      return {
        box: this.isSquare,
        longBox: !this.isSquare,
        red: this.userClass === 'red',
        blue: this.userClass === 'blue',
        green: this.userClass === 'green',
        purple: this.userClass === 'purple'
      }
    },
    myStyle: function() {
      return {
        backgroundColor: this.hasStyle ? 'turquoise' : 'gray',
        width: this.hasStyle ? 500 + 'px' : 100 + 'px',
        height: this.hasStyle ? 100 + 'px' : 100 + 'px'
      }
    },
    myBarOutline: function() {
      return {
        width: this.barTotalPx + 'px'
      }
    },
    myBar: function() {
      return {
        width: (this.progress / 100) * this.barTotalPx + 'px'
      }
    },
    startProgress: function() {
      if (this.progress === 0) {
        let tmp = this;
        setInterval(function() {
          if (tmp.progress < 100) {
            tmp.progress += 0.03;
          }
        }, 1);
      }
      else {
        this.progress = 0;
      }
    },
    
  },
  methods: {
    startEffect: function() {
      if (!this.effectStarted) {
        this.effectStarted = true;
        let tmp = this;
        setInterval(function() {
          tmp.highlight = !tmp.highlight;
        }, 3000);
      }
    },
    setClass: function(event) {
      this.userClass = event.target.value;
    },
    setSquare: function(event) {
      if (event.target.value === 'true') {
        this.isSquare = true;
      }
      else if (event.target.value === 'false') {
        this.isSquare = false;
      }
    },
    setStyle: function(event) {
      if (event.target.value === 'true') {
        this.hasStyle = true;
      }
      else if (event.target.value === 'false') {
        this.hasStyle = false;
      }
    },
    
  }
});
