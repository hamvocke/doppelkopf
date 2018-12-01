<template>
  <div class="scorecard" >
    <h1 class="message">{{ message }}</h1>
    <table>
      <tr>
        <th class="player number" v-for='player in players' :key='player.id'>
          {{ player.name }}
        </th>
        <th class="number">Punkte</th>
      </tr>
      <tr class="scoreLine" v-for='(scoreLine, index) in scorecard.scoreLines' :key='scoreLine.id' :class='{ bold: isLastLine(index) }'>
        <td v-for='player in players' :key='player.id' class="number">
          {{ scoreLine.score[player.id] }}
        </td>
        <td class="number">
          {{ scoreLine.points }}
        </td>
      </tr>
    </table>

    <div class="button-row">
      <button class="button next-round" @click="triggerNextRound">Next Round</button>
    </div>
  </div>
</template>

<script>
import { includes } from "lodash";

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
    },
    currentScore: {
      type: Object,
      required: true
    }
  },
  computed: {
    message: function() {
      return includes(this.currentScore.winner(), this.players[0])
        ? "Yay, you win! 🏆"
        : "You lose";
    }
  },
  methods: {
    triggerNextRound: function() {
      this.$emit("nextRound");
    },
    isLastLine(index) {
      return index === this.scorecard.scoreLines.length - 1;
    }
  }
};
</script>

<style scoped>
.scorecard {
  font-family: sans-serif;
  text-align: center;
  background: white;
  padding: 12px;
  margin: 6px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: fixed;
  top: 24px;
  left: calc(-50vw + 50%);
  right: calc(-50vw + 50%);
  margin-left: auto;
  margin-right: auto;
  width: 66%;
}

.scorecard table {
  text-align: left;
  width: 100%;
  padding: 6px;
  table-layout: fixed;
}

th,
td {
  line-height: 2em;
}

th {
  border-bottom: 1px solid #eee;
}

.number {
  text-align: right;
}

.bold {
  font-weight: bold;
}

.button-row {
  text-align: right;
}

@media screen and (max-width: 680px) {
  .scorecard {
    width: 90%;
  }
}
</style>
