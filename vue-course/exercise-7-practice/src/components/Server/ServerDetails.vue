<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="server.id === -1">Server Details are currently not updated</p>
        <p v-else>The status of server #{{ server.id }} is {{ server.status.toLowerCase() }}</p>
        <hr>
        <button 
          v-show="server.id > 0"
          @click="reset"
          >
          Reset server
        </button>
    </div>

</template>

<script>
import { eventBus } from '../../main.js';
export default {
  data() {
    return {
      server: { id: -1, status: 'Unknown'}
    }
  },
  methods: {
    updateDetails(server) {
      this.server = server;
    },
    reset() { // I can do this because it is a reference to the original server
    // objects are reference types
      this.server.status = 'Normal';
    }
  },
  created() {
    eventBus.$on('serverClicked', 
      (server) => this.updateDetails(server));
  }
}
</script>
