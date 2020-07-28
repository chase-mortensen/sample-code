<template>
  <div>
    <h3>Edit the User</h3>
    <p>Locale: {{ $route.query.locale }}</p>
    <p>Analytics: {{ $route.query.q }}</p>
    <hr>
    <button 
      class="btn btn-primary"
      @click="confirmed = true"
    >Confirm</button>
    <div style="height: 700px"></div>
    <p id="data">Extra data</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmed: false
    };
  },
  beforeRouteLeave (to, from, next) {
    // check if confirmed before leaving
    if (this.confirmed) {
      next();
    } else {
      if (confirm('Are you sure?')) {
        next();
      } else {
        next(false);
      }
    }
  }
}
</script>