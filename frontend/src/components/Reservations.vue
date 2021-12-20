<template>
  <div class="reservations">Reservations</div>
</template>

<script>
export default {
  name: "Reservations",
  props: {
    game: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
#root {
  height: 100%;
}
</style>
