import Vue from 'vue'
import App from './App.vue'

// export const eventBus = new Vue({
//   methods: {
//     addQuote(quote) {
//       this.$emit('add-quote', quote);
//     }
//   }
// });

new Vue({
  el: '#app',
  render: h => h(App)
})
