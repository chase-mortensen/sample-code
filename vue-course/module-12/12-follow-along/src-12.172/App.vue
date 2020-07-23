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
        <p v-local-highlight:background.delayed="'lightseagreen'">Custom local directive to color this paragraph.</p>
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

        if (binding.modifiers['delayed']){
          delay = 3000;
        }

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
</script>

<style>

</style>
