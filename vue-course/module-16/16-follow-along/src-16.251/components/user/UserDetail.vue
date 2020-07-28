<template>
  <div>
    <h3>Some User Details</h3>
    <p>User has ID: {{ $route.params.id }}</p>
    <router-link 
      class="btn btn-secondary"
      :to="{ name: 'userEdit', params: { id: $route.params.id }, query: { locale: 'en', q: 100 } }"
      tag="button">Edit User</router-link>
  </div>
</template>