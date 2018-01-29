<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['message', 'level']
}
</script>

<style scoped>

</style>
