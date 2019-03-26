<template>
  <div class="scorecard" >
    <h1 class="message">{{ $t(message) }}</h1>

    <div class="row">
      <div class="column">
        <h2>{{ $t('results') }}</h2>
        <div class="row">
          <table>
            <tr>
              <th><strong>Re</strong> <em>({{ currentScore.rePoints }} {{ $t('points') }})</em></th>
              <th><strong>Kontra</strong> <em>({{ currentScore.kontraPoints }} {{ $t('points') }})</em></th>
            </tr>
            <tr>
              <td class="extras re">
                <ul>
                  <li v-for='extra in currentScore.listExtras("Re")' :key='extra'>{{ $t(extra) }}</li>
                </ul>
              </td>
              <td class="extras kontra">
                <ul>
                  <li v-for='extra in currentScore.listExtras("Kontra")' :key='extra'>{{ $t(extra) }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="sum re">
                <span v-if='currentScore.winningParty() === "Re"'>{{ currentScore.points() }} {{ $t('points') }}</span>
              </td>
              <td class="sum kontra">
                <span v-if='currentScore.winningParty() === "Kontra"'>
                {{ currentScore.points() }} {{ $t('points') }}
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="column">
        <h2>{{ $t('points') }}</h2>
        <table>
          <tr>
            <th class="player right-aligned" v-for='player in players' :key='player.id'>
              {{ player.name }}
            </th>
            <th class="right-aligned">{{ $t('points') }}</th>
          </tr>
          <tr class="scoreLine" v-for='(scoreLine, index) in scorecard.scoreLines' :key='scoreLine.id' :class='{ bold: isLastLine(index) }'>
            <td v-for='player in players' :key='player.id' class="right-aligned">
              {{ scoreLine.totalPoints[player.id] }}
            </td>
            <td class="right-aligned">
              {{ scoreLine.points }}
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="button-row">
      <button class="button next-round" @click="triggerNextRound">{{ $t('next-round') }}</button>
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
        ? "you_win"
        : "you_lose";
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
  text-align: left;
  background: white;
  padding: 12px;
  margin: 6px;
  border-radius: 6px;
  box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  position: fixed;
  top: 24px;
  left: calc(-50vw + 50%);
  right: calc(-50vw + 50%);
  margin-left: auto;
  margin-right: auto;
  width: 66%;
}

h1,
h2,
h3 {
  text-align: center;
}

.scorecard table {
  text-align: left;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

th,
td {
  line-height: 2em;
}

th em {
  font-weight: lighter;
}

.player {
  overflow: hidden;
  text-overflow: ellipsis;
}

.right-aligned {
  text-align: right;
}

.bold {
  font-weight: bold;
}

.button-row {
  text-align: right;
}

.extras {
  line-height: 1.5em;
}

.extras ul {
  padding-left: 0;
  list-style: circle inside;
}

.sum {
  border-top: 1px solid var(--cyan);
  padding: 6px 0;
  text-align: left;
  width: 100%;
}

@media screen and (max-width: 680px) {
  .scorecard {
    width: 90%;
  }
}
</style>
