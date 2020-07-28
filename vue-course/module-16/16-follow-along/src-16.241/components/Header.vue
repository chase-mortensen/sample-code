<template>
  <ul class="nav nav-pills">
    <router-link 
      tag="li"
      class="nav-item"
      active-class="active"
      to="/"
      exact
    >
      <a>Home</a>
    </router-link>
    <router-link 
      tag="li"
      class="nav-item"
      active-class="active"
      to="/user/10"
    >
      <a>User</a>
    </router-link>
    
  </ul>
</template>