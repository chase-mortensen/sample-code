<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="editAge">Edit age</button>
    </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  props: {
    userAge: Number
  },
  methods: {
    editAge() {
      this.userAge = 30;
      // this.$emit('ageChanged', this.userAge);
      eventBus.$emit('ageChanged', this.userAge);
    }
  }
}
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
