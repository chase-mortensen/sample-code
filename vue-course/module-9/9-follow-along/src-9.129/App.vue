<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <app-quote>
          <h2 slot="title">{{ quoteTitle }}</h2>
          <p>Here is an example quote</p>
        </app-quote>
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote.vue';
  export default {
    data() {
      return {
        quoteTitle: "An example quote."
      };
    },
    components: {
      'app-quote': Quote
    }
  }
</script>

<style scoped>
  h2 { 
    color: red;
  }
</style>
