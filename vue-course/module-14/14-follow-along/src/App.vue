<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Animations</h1>
        <hr>
        <select v-model="alertAnimation">
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <br><br>
        <button 
          @click="show = !show"
          class="btn btn-primary"
          >{{ show ? 'Hide alert' : 'Show alert' }}</button>
        <br><br>
        <transition :name="alertAnimation">
          <div 
            v-if="show" 
            class="alert alert-info"
            >This is some info</div>
        </transition>
        <transition 
          type="animation"
          name="slide">
          <div 
            v-if="show" 
            class="alert alert-info"
            >This is some info</div>
        </transition>
        <transition 
          appear
          enter-active-class="animated bounce"
          leave-active-class="animated shake"
        >
          <div 
            v-if="show" 
            class="alert alert-info"
            >This is some info</div>
        </transition>
        <transition 
          :name="alertAnimation"
          mode="out-in"
        >
          <div 
            v-if="show" 
            key="info"
            class="alert alert-info"
            >This is some info</div>
          <div 
            v-else
            key="warning"
            class="alert alert-warning"
            >This is some warning</div>
        </transition>
        <hr>
        <button 
          class="btn btn-primary"
          @click="load = !load"
        >{{ load ? "Remove element" : "Load element" }}</button>
        <br><br>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"

          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"

          :css="false"
        >
          <div
            v-if="load"
            style="width: 100px; height: 100px; background-color: lightblue;">
          </div>
        </transition>
        <hr>
        <button
          @click="selectedComponent === 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'" 
          class="btn btn-primary">Toggle</button>
        <br><br>
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="selectedComponent"></component>
        </transition>
        <hr>
        <button 
          class="btn btn-primary" 
          @click="addItem"
        >Add item</button>
        <br><br>
        <ul class="list-group">
          <transition-group name="slide">
            <li 
              @click="removeItem(i)"
              class="list-group-item" 
              v-for="(number, i) in numbers" 
              :key="number"
              style="cursor: pointer"
            >{{ number }}</li>
          </transition-group>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import DangerAlert from './DangerAlert.vue';
import SuccessAlert from './SuccessAlert.vue';

export default {
  data() {
    return {
      load: false,
      show: false,
      alertAnimation: 'fade',
      elementWidth: 100,
      selectedComponent: 'app-success-alert',
      numbers: [1, 2, 3, 4, 5],
      current: 6
    }
  },
  methods: {
    addItem() {
      let pos = Math.ceil(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.current++);
    },
    removeItem(i) {
      this.numbers.splice(i,1);
    },
    beforeEnter(el) {
      console.log('beforeEnter');
      el.style.width = '0px';
    },
    enter(el, done) {
      console.log('enter');
      let round = 1;
      this.elementWidth = 0;
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth + round * 15) + 'px';
        round++;

        if (round > 20) {
          clearInterval(interval);
          done();
        }
        
      }, 20);
    },
    afterEnter(el) {
      console.log('afterEnter');
    },
    enterCancelled(el) {
      console.log('enterCancelled');
    },
    beforeLeave(el) {
      console.log('beforeLeave');
      el.style.width = '300px';
    },
    leave(el, done) {
      console.log('leave');
      this.elementWidth = 300;
      let round = 1;
      
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth - round * 15) + 'px';
        round++;

        if (round > 20) {
          clearInterval(interval);
          done();
        }
        
      }, 20);
    },
    afterLeave(el) {
      console.log('afterLeave');
    },
    leaveCancelled(el) {
      console.log('leaveCancelled');
    }
  },
  components: {
    'app-danger-alert': DangerAlert,
    'app-success-alert': SuccessAlert
  }
}
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity .5s;
}

/* .slide-leave {

} */

.slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 1s;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}
</style>
