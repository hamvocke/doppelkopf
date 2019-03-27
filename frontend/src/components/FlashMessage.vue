<template>
  <div class="flashMessage">
    <div class="icon" v-if="icon">{{ icon }}</div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  props: {
    message: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.flashMessage {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

</style>
