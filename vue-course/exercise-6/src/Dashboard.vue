<template>
  <div class="row">
    <app-server-list></app-server-list>
    <app-server-details></app-server-details>
  </div>
</template>

<script>
import ServerDetails from './ServerDetails.vue';
import ServerList from './ServerList.vue';

export default {
  components: {
    'app-server-details': ServerDetails,
    'app-server-list': ServerList
  }
}
</script>