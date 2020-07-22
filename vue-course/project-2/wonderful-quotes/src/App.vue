<template>
  <div class="container">
    <app-header
      :numQuotes="quotes.length"
      :maxQuotes="maxQuotes"></app-header>
    <app-new-quote 
      @addQuoteEvent="addQuote"></app-new-quote>
    <app-quote-grid 
      :quotes="quotes" 
      @removeQuoteEvent="removeQuote"></app-quote-grid>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { eventBus } from './main.js';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import QuoteGrid from './components/QuoteGrid.vue';
import NewQuote from './components/NewQuote.vue';


export default {
  data() {
    return {
      quotes: [
        'This is a test quote',
        'This is another test quote',
        'This is a third test quote',
        'This is a fourth test quote',
        'This is a fifth test quote and is longer just to test the text-wrapping',
        'This is a test quote',
        'This is another test quote',
        'This is a third test quote',
        'This is a fourth test quote',
        'This is a fifth test quote and is longer just to test the text-wrapping',
      ],
      maxQuotes: 10
    };
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-quote-grid': QuoteGrid,
    'app-new-quote': NewQuote
  },
  methods: {
    addQuote(quote) {
      if (this.quotes.length < this.maxQuotes) {
        this.quotes.push(quote);
      } else {
        alert('Too many quotes!');
      }
    },
    removeQuote(i) {
      this.quotes.splice(i, 1);
    }
  },
}
</script>

