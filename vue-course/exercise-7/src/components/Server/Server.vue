<template>
  <li
    class="list-group-item"
    :key="server.id"
    @click="serverSelected(server)">
      Server #{{ server.id }}
  </li>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
  props: {
    'server': {
      required: true
    }
  },
  methods: {
    serverSelected(server) {
      eventBus.serverSelected(server);
    }
  }
}
</script>

<style>

</style>
