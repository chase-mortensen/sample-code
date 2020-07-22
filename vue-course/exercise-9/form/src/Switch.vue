<template>
  <div>
    <div
      id="on"
      @click="switched(true)"
      :class="{active: value}">Yes</div>
    <div
      id="off"
      @click="switched(false)"
      :class="{active: !value}">No</div>
  </div>
</template>

<script>
export default {
  methods: {
    switched(isOn) {
      this.$emit('input', isOn); // v-model is waiting for 'input'
    }
  },
  props: ['value'],

}
</script>

<style scoped>

#on, #off {
  width: 40px;
  height: 20px;
  background-color: lightgray;
  padding: 2px;
  display: inline-block;
  margin: 10px -2px;
  box-sizing: content-box;
  cursor: pointer;
  text-align: center;
}

#on:hover {
  background-color: darkseagreen;
}

#on.active {
  background-color: seagreen;
}

#off:hover{
  background-color: lightcoral;
}

#off.active {
  background-color: indianred;
}
</style>