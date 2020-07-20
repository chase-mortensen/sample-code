<template>
  <div class="col-xs-12 col-sm-6">
    <p>{{ id === 0 ? status : 'Server ' + id + ' is ' + status }}</p>
  </div>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
  data() {
    return {
      id: 0,
      status: "Server details are currently not updated"
    }
  },
  created() {
    eventBus.$on('showServer', (server) => {
      this.status = server.status;
      this.id = server.id;
    });
  }
}
</script>

<style>

</style>
