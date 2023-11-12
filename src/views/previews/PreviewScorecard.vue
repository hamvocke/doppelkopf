<!-- This view is intended for previewing in-development components only. -->

<template>
  <div id="root">
    <Scorecard :scorecard="scorecard" :players="players" :currentScore="someScore" />
  </div>
</template>

<script setup lang="ts">
import { Game } from "@/models/game";
import { Scorecard as ScorecardModel } from "@/models/scorecard";
import { ScoreBuilder } from "../../../tests/builders/scoreBuilder";
import { PartyName } from "@/models/party";
import Scorecard from "@/components/Scorecard.vue";

const game = Game.singlePlayer();
const players = game.players;
const scorecard = new ScorecardModel(players);
const someScore = new ScoreBuilder()
  .withWinners(PartyName.Re, players[0], players[1])
  .withLosers(PartyName.Kontra, players[2], players[3])
  .withRePoints(4)
  .withKontraPoints(-4)
  .build();

scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
scorecard.addScore(someScore);
</script>

<style scoped>
#root {
  height: 100%;
}
</style>
