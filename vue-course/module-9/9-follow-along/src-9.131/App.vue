<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button @click="selectedComponent = 'app-quote'">Quote</button>
        <button @click="selectedComponent = 'app-author'">Author</button>
        <button @click="selectedComponent = 'app-new'">New quote</button>

        <p>{{ selectedComponent }}</p>

        <component :is="selectedComponent">
          <p>Default text</p>
        </component>

        <!-- <app-quote>
          <h2 slot="title">{{ quoteTitle }}</h2>
          <p>Here is an example quote</p>
        </app-quote> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote.vue';
  import Author from './components/Author.vue';
  import New from './components/New.vue';

  export default {
    data() {
      return {
        quoteTitle: "An example quote.",
        selectedComponent: 'app-quote'
      };
    },
    components: {
      'app-quote': Quote,
      'app-author': Author,
      'app-new': New
    }
  }
</script>

<style scoped>
  h2 { 
    color: red;
  }
</style>
