<template>
  <button class="button" @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.button {
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 18px;
  margin: 6px;
  color: var(--white);
  background: var(--red);
  border-radius: 6px;
  display: inline;
  font-size: 1.2em;
  border-bottom: 5px solid color(var(--red) shade(20%));
}

.button:hover,
.button:active {
  border-bottom: 3px solid color(var(--red) shade(20%));
  position: relative;
  top: 2px;
}
</style>
