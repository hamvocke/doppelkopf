<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
