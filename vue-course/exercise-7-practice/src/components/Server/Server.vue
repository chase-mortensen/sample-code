<template>
  <li
    class="list-group-item"
    @click="serverClicked"
    style="cursor: pointer"
    >
    Server #{{ server.id }}
  </li>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
  props: {
    server: {
      required: true
    }
  },
  methods: {
    serverClicked() {
      eventBus.serverSelected(this.server);
    }
  }
}
</script>