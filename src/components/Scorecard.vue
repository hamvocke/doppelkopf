<template>
  <div class="scorecard" >
    <div class="players">
      <span class="player" v-for='player in scorecard.players'>{{ player.name }}</span>
    </div>
    <div class="score" v-for='scoreLine in scorecard.scoreLines'>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scorecard',
  props: {
    scorecard: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.notifications {
  grid-area: notifications;
}

.message {
  text-align: center;
  margin: 0px auto 6px;
  width: 100%;
  padding: 6px;
  background: rgba(255, 255, 255, 0.3);
  color: #333;
}

</style>
