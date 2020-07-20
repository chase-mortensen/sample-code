<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ switchName() }}</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="resetName()">Reset name</button>
        <button @click="resetFn()">Reset name</button>
    </div>
</template>

<script>
  export default {
    props: {
      // name: String
      // name: [String, Array]
      name: {
        type: String,
        // required: true,
        default: 'Ron'
      },
      resetFn: Function,
      userAge: Number
    },
    methods: {
      switchName() {
        return this.name.split("").reverse().join("");
      },
      resetName() {
        this.name = 'Chase';
        this.$emit('nameChanged', this.name);
      },
    }
  }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
