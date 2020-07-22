<template>
  <div class="row">
    <app-quote 
      v-for="(quote, i) in quotes" 
      :key="i"
      @click.native="removeQuote(i)">{{ quote }}</app-quote>
  </div>
</template>

<script>
import Quote from './Quote.vue';
export default {
  props: {
    quotes: {
      required: true
    },
  },
  components: {
    'app-quote': Quote
  },
  methods: {
    removeQuote(i) {
      this.$emit('removeQuoteEvent', i);
    }
  }
}
</script>