<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives Exercise</h1>
                <!-- Exercise -->
                <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
                <button v-my-on:click="increment">Increment</button>
                <p>{{ counter }}</p>
                <hr>
                <div 
                  style="width: 100px; height: 100px; background-color: cadetblue"
                  v-my-on:mouseenter="mouseEnter"
                  v-my-on:mouseleave="mouseLeave">{{ mouseIn ? "in" : "out" }}</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
        mouseIn: false
      };
    },
    methods: {
      increment() {
        this.counter++;
      },
      mouseEnter() {
        this.mouseIn = true;
      },
      mouseLeave() {
        this.mouseIn = false;
      }
    },
    directives: {
      'my-on': {
        bind(el, binding) {
          // el.onclick = () => {
          //   binding.value();
          // }
          const type = binding.arg;
          const fn = binding.value;
          el.addEventListener(type, fn);
        }
      }
    }
  }
</script>

<style>
</style>
