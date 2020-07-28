<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <p>Loaded ID: {{ id }}</p>
    <button 
      class="btn btn-primary"
      @click="navigateHome"
    >Go to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    navigateHome() {
      this.$router.push('/');
    }
  }
}
</script>