<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Directives</h1>
        <p v-text="'This is the v-text directive.'"></p>
        <p v-html="'<strong>This is the v-html directive using the strong tag.</strong'"></p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Custom Directives</h1>
        <p v-highlight:background.delayed="'lightcoral'">Custom global directive to color this paragraph.</p>
        <p v-local-highlight:background.delayed.blink="{colors: ['white'], speed: 500}">Custom local directive to color this paragraph.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    'local-highlight': {
      bind(el, binding, vnode) {
        let delay = 0;
        let colors = null;
        let color = null;
        let i = 0;

        if (binding.modifiers['delayed']){
          delay = binding.value.speed;
        }

        if (binding.modifiers['blink']) {
          setTimeout(() => {
            setInterval(() => {
              colors = binding.value.colors;
              if (colors.length === 1) {
                colors.push('lightgray');
              }
              color = colors[i];

              if (binding.arg == 'background') {
                el.style.backgroundColor = color;
              } else {
                el.style.color = color;
              }
              i = ++i%colors.length;
            }, 300)
          }, delay);
        } else {

          setTimeout(() => {
            if (binding.arg == 'background') {
              el.style.backgroundColor = binding.value;
            } else {
              el.style.color = binding.value;
            }
          }, delay);
        }
      
      }

    }
  }
}
</script>

<style>

</style>
