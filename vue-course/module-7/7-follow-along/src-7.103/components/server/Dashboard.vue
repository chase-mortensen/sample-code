<template>
  <div class="row">
    <app-server-list></app-server-list>
    <app-server-details></app-server-details>
  </div>
</template>

<script>
import ServerDetails from './ServerDetails.vue';
import AppServerList from './ServerList.vue';

export default {
  components: {
    appServerDetails: ServerDetails, //names get converted to hyphenated version for use in DOM
    AppServerList // like AppServerList: AppServerList
  }
}
</script>