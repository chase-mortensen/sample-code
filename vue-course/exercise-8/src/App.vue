<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <br>
        <button 
          class="btn btn-primary"
          @click="curTemplate = 'app-blue'"
        >Load Blue Template</button>
        <button 
          class="btn btn-success"
          @click="curTemplate = 'app-green'"
        >Load Green Template</button>
        <button 
          class="btn btn-danger"
          @click="curTemplate = 'app-red'"
        >Load Red Template</button>
        <hr>
        <component :is="curTemplate">
          <h2 slot="title">This is the Title</h2>
          <p slot="content">This is the content.</p>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
  import Blue from './components/Blue.vue';
  import Green from './components/Green.vue';
  import Red from './components/Red.vue';

  export default {
    data() {
      return {
        curTemplate: 'app-blue',
        title: 'This is the Title',
        content: 'This is some content'
      };
    },
    components: {
        'app-blue': Blue,
        'app-green': Green,
        'app-red': Red
    }
  }
</script>

<style>
</style>
