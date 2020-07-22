<template>
  <div>
    <div class="form-group">
      <label for="firstName">First name:</label>
      <input
        type="text"
        id="firstName"
        class="form-control"
        @input="value.firstName = $event.target.value" 
        > <!-- directly editing value.firstName works because user is an object -->
    </div>
    <div class="form-group">
      <label for="lastName">Last name:</label>
      <input
        type="text"
        id="lastName"
        class="form-control"
        @input="value.lastName = $event.target.value"
        >
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>