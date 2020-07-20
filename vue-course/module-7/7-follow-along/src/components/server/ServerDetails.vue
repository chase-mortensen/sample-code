<template>
  <div class="col-xs-12 col-sm-6">
        <p>{{ serverDetails }}</p>
      </div>
</template>

<script>
export default {
  data() {
    return {
      serverDetails: 'Server Details are currently not updated'
    };
  }
}
</script>

<style scoped>
  div {
    border: 1px solid red;
  }
</style>