<template>
  <div>
    <h3>Some User Details</h3>
    <p>User has ID: {{ $route.params.id }}</p>
    <router-link 
      class="btn btn-secondary"
      :to="'/user/' + $route.params.id + '/edit'"
      tag="button">Edit User</router-link>
  </div>
</template>