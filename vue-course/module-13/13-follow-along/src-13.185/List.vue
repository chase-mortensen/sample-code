<template>
  <div>
    <input v-model="filterText">
    <ul>
      <li v-for="(fruit, i) in filteredFruits" :key="i">{{ fruit }}</li>
    </ul>

  </div>
</template>

<script>
import { fruitMixin } from './fruitMixin.js';
export default {
  mixins: [fruitMixin],
  created() {
    console.log('Inside List.vue created');
  }
}
</script>

<style>

</style>
