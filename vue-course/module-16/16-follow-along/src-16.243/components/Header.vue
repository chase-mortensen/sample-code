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
      to="/user/1"
    >
      <a>User 1</a>
    </router-link>
    <router-link 
      tag="li"
      class="nav-item"
      active-class="active"
      to="/user/2"
    >
      <a>User 2</a>
    </router-link>
    
  </ul>
</template>