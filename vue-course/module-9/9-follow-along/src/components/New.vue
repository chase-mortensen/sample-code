<template>
  <div>
    <h3>New Quote</h3>
    <button @click="counter++">Increment</button>
    <p>{{ counter }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  destroyed() {
    console.log('new quote destroyed');
  },
  deactivated() {
    console.log('new quote deactivated');
  },
  activated() {
    console.log('new quote activated');
  }
}
</script>

<style scoped>
</style>