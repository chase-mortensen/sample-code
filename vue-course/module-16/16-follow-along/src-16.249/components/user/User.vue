<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <!-- <p>Loaded ID: {{ id }}</p> -->
    <button 
      class="btn btn-primary"
      @click="navigateHome"
    >Go to Home</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     id: this.$route.params.id
  //   }
  // },
  // watch: {
  //   '$route'(to, from) {
  //     this.id = to.params.id;
  //   }
  // },
  // props: {
  //   id: {
  //     required: true
  //   }
  // },
  methods: {
    navigateHome() {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>