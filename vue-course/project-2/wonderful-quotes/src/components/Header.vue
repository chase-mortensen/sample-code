<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Quotes Added</h3>
      <div class="progress">
        <div 
          class="progress-bar"
          role="progressbar"
          :aria-valuenow="numQuotes * 10"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="'width:' + (numQuotes * 10) + '%'">
          {{ numQuotes }} / {{ maxQuotes }}  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numQuotes: {
      type: Number,
      required: true
    },
    maxQuotes: {
      type: Number,
      default: 10
    }
  },
}
</script>
