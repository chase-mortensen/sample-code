<template>
  <div id="app">
    <h1>Server Status: {{ status }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: 'Critical'
    };
  }
}
</script>

<style>
</style>
