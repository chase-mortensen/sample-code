<template>
  <div class="row">
    <form>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <label>Quote</label>
        <textarea 
          v-model="quote" 
          class="form-control"
          rows="3"
          ></textarea>
      </div>
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
        <button
          class="btn btn-primary" 
          @click.prevent="addQuote"
        >Add quote</button>
      </div>
    </form>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  data() {
    return {
      quote: "",
    };
  },
  methods: {
    addQuote() {
      // eventBus.addQuote(this.quote);
      this.$emit('addQuoteEvent', this.quote);
      this.quote="";
    }
  }
}
</script>
