<template>
  <div>
    <div
      id="on"
      @click="switched(true)"
      :class="{active: value}">On</div>
    <div
      id="off"
      @click="switched(false)"
      :class="{active: !value}">Off</div>
  </div>
</template>

<script>
export default {
  methods: {
    switched(isOn) {
      this.value = isOn;
      this.$emit('input', this.value); // v-model is waiting for 'input'
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

#on:hover, #on.active {
  background-color: lightgreen;
}

#off:hover, #off.active {
  background-color: lightcoral;
}
</style>