<template>
  <div class="scorecard" >
    <h1>Score</h1>
    <table>
      <tr>
        <th class="player" v-for='player in scorecard.players' :key='player.id'>{{ player.name }}</th>
      </tr>
      <tr class="scoreLine" v-for='scoreLine in scorecard.scoreLines'>
        <td v-for='score in scoreLine'>
          {{ score }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Scorecard",
  props: {
    scorecard: {
      type: Object,
      required: true
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

.scorecard th,
.scorecard td {
  padding: 6px;
}
</style>
