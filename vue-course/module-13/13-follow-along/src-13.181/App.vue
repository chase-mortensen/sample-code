<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <p>{{ text | to-upper | to-lower }}</p>
        <hr>
        <input v-model="filterText">
        <ul>
          <li v-for="(fruit, i) in filteredFruits" :key="i">{{ fruit }}</li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'This is some example text.',
      fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
      filterText: ''
    };
  },
  filters: {
    'to-upper'(value) {
      return value.toUpperCase();
    }
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((el) => {
        return el.match(this.filterText);
      })
    }
  }

}
</script>

<style>

</style>
