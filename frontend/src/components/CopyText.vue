<template>
  <div class="copyText">
    <input type="text" :value="text" readonly />
    <button class="">
      <span v-if="icon">{{ icon }}</span>
      Copy
    </button>
  </div>
</template>

<script>
export default {
  name: "CopyText",
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.copyText {
  display: flex;
  align-items: center;
}

input {
  padding: 12px 2px;
  font-size: 1.4em;
  font-family: monospace;
  border: none;
  border-radius: 4px 0 0 4px;
}

button {
  margin-left: -3px;
  padding: 12px 16px;
  border: none;
  color: var(--white);
  background-color: var(--lightblue);
  border-radius: 0 4px 4px 0;
}
</style>
