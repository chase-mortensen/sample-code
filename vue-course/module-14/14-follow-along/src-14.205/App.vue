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
        >
          <div
            v-if="load"
            style="width: 100px; height: 100px; background-color: lightblue;">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      load: true,
      show: false,
      alertAnimation: 'fade'
    }
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter');
    },
    enter(el, done) {
      console.log('enter');
      done();
    },
    afterEnter(el) {
      console.log('afterEnter');
    },
    enterCancelled(el) {
      console.log('enterCancelled');
    },
    beforeLeave(el) {
      console.log('beforeLeave');
    },
    leave(el, done) {
      console.log('leave');
      done();
    },
    afterLeave(el) {
      console.log('afterLeave');
    },
    leaveCancelled(el) {
      console.log('leaveCancelled');
    }
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
