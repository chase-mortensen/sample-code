<template>
  <div class="col-xs-12 col-sm-6">
    <ul class="list-group">
      <app-server 
        v-for="server in servers" 
        :server="server"
        :key="server.id"
        ></app-server>
    </ul>
  </div>
</template>

<script>
import Server from './Server.vue';
import { eventBus } from '../../main.js';
export default {
  data() {
    return {
      servers: [
        { id: 1, status: 'Normal'},
        { id: 2, status: 'Unknown'},
        { id: 3, status: 'Critical'},
        { id: 4, status: 'Normal'}
      ],
    }
  },
  components: {
    'app-server': Server
  },
}
</script>