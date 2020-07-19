<template>
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <p>{{ footerText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerText: 'All Servers are managed here'
    };
  },
}
</script>