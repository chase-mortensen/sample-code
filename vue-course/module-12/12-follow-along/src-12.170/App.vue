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
        <p v-highlight:background.delayed="'lightcoral'">Custom directive to color this paragraph.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
