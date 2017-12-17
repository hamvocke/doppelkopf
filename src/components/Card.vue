<template>
  <div class="card">
    {{ card.rank }} {{ card.suite }}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card']
}
</script>

<style scoped>

.card {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 8px;
    display: inline-block;
    height: 200px;
    width: 150px;
}

</style>
