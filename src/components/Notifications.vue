<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.message {
  position: relative;
  top: 0px;
  margin: 0px auto 6px;
  width: 80%;
  padding: 6px;
  background: rgba(255, 255, 255, 0.3);
  color: #333;
}

</style>
