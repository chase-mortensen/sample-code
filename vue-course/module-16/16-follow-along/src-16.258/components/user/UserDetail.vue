<template>
  <div>
    <h3>Some User Details</h3>
    <p>User has ID: {{ $route.params.id }}</p>
    <router-link 
      class="btn btn-secondary"
      :to="link"
      tag="button">Edit User</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: { 
        name: 'userEdit', 
        params: { 
          id: this.$route.params.id 
        }, 
        query: { 
          locale: 'en', 
          q: 100 
        },
        hash: '#data'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // could check if user is authenticated here
    console.log('inside UserDetail.vue beforeRouteEnter');
    next();
  }
}
</script>