<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <p>{{ text | to-upper | to-lower }}</p>
        <button @click="fruits.push('Raspberry')">Add new fruit</button>
        <hr>
        <input v-model="filterText">
        <ul>
          <li v-for="(fruit, i) in filteredFruits" :key="i">{{ fruit }}</li>
        </ul>
        <hr>
        <app-list></app-list>

      </div>
    </div>
  </div>
</template>

<script>
import List from './List.vue';
import { fruitMixin } from './fruitMixin.js';

export default {
  data() {
    return {
      text: 'This is some example text.',
    };
  },
  filters: {
    'to-upper'(value) {
      return value.toUpperCase();
    }
  },
  components: {
    'app-list': List
  },
  mixins: [fruitMixin],
  created() {
    console.log('Inside App.vue created');
  }

}
</script>

<style>

</style>
