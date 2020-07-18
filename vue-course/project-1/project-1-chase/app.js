new Vue({
  el: '#app',
  data: {
    inGame: false,
    playerHealth: 100,
    monsterHealth: 100,
    events: []
  },
  computed: {
    playerBarStyle: function() {
      return {
        width: this.playerHealth > 6 ? this.playerHealth + '%' : '6%',
      };
    },
    monsterBarStyle: function() {
      return {
        width: this.monsterHealth > 6 ? this.monsterHealth + '%' : '6%',
      };
    }
  },
  methods: {
    startGame: function() {
      this.inGame = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.events = [];
    },
    checkGameOver: function () {
      let gameOver = false;
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        gameOver = true;
      } else if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        gameOver = true;
      }

      if (gameOver) {
        if(confirm(this.playerHealth === 0 ? 'Monster won. New game?' : 'You won! New game?')) {
          this.startGame();
        } else {
          this.inGame = false;
        }
        return true;
      }
      return false;
    },
    addEventLog: function(value, turn, isAttack) {
      if (turn === 'monster-turn') {
        this.events.unshift({message: 'MONSTER HITS PLAYER FOR ' + value, turn: turn});
      } else {
        if (isAttack) {
          this.events.unshift({message: 'PLAYER HITS MONSTER FOR ' + value, turn: turn});
        } else {
          this.events.unshift({message: 'PLAYER HEALS HIMSELF FOR ' + value, turn: turn});
        }
      }

    },
    monsterAttack: function () {
      if (!this.checkGameOver()) {
        let damage = this.getRandomNum(6);
        this.playerHealth -= damage;
        this.addEventLog(damage, 'monster-turn', true);
      }
    },
    attack: function(max) {
      let damage = this.getRandomNum(max);
      if (damage > this.monsterHealth){
        this.monsterHealth = 0;
      } else {
        this.monsterHealth -= damage;
      }
      this.addEventLog(damage, 'player-turn', true);
      
      let vm = this;
      setTimeout(function() {
        vm.monsterAttack();
      }, 200);
    },
    heal: function() {
      let health = this.getRandomNum(8);
      this.playerHealth += health;
      
      this.addEventLog(health, 'player-turn', false);

      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      
      let vm = this;
      setTimeout(function() {
        vm.monsterAttack();
      }, 200);
    },
    getRandomNum: function(max) {
      return Math.ceil(Math.random() * max);
    },
    giveUp: function() {
      this.inGame = false;
    }
  }

})