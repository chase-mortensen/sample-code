export const addLength = {
  computed: {
    addLengthAlt() {
      return this.text + ' (' + this.text.length + ')';
    }
  }
}