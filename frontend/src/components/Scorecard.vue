<template>
  <div class="scorecard" >
    <h1>Score</h1>
    <table>
      <tr>
        <th class="player" v-for='player in players' :key='player.id'>
          {{ player.name }}
        </th>
        <th>Punkte</th>
      </tr>
      <tr class="scoreLine" v-for='scoreLine in scorecard.scoreLines' :key='scoreLine.id'>
        <td v-for='player in players' :key='player.id'>
          {{ scoreLine.score[player.id] }}
        </td>
        <td>{{ scoreLine.points }}</td>
      </tr>
    </table>

    <button class="button next-round" @click="triggerNextRound">Next Round</button>
  </div>
</template>

<script>
export default {
  name: "Scorecard",
  props: {
    scorecard: {
      type: Object,
      required: true
    },
    players: {
      type: Array,
      required: true
    }
  },
  methods: {
    triggerNextRound: function() {
      this.$emit("nextRound");
    }
  }
};
</script>

<style scoped>
.scorecard {
  font-family: sans-serif;
  text-align: center;
  background: white;
  padding: 6px;
  margin: 6px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: fixed;
  top: 24px;
  left: calc(-50vw + 50%);
  right: calc(-50vw + 50%);
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.scorecard table {
  width: 90%;
  padding: 6px;
}

.scorecard th,
.scorecard td {
  line-height: 2em;
  text-align: right;
}

.scorecard th {
  border-bottom: 1px solid #eee;
}
</style>
