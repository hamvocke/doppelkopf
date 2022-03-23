<template>
  <modal :visible="true">
    <h1>Alle Gesund?</h1>

    <p>
      Hier sind deine Karten. Willst du ein normales Spiel oder ein Sonderspiel
      spielen?
    </p>

    <div class="hand-wrapper">
      <hand
        :hand="game.players[0].hand"
        :position="game.players[0].tablePosition"
        :is-selectable="false"
        :is-covered="false"
        :playable-cards="[]"
      />
    </div>

    <div class="dark-box">
      <h2>Spiel mit Partner</h2>
      <div class="flex-row">
        <img
          src="@/assets/img/handshake.png"
          alt="normal game icon"
          class="reservation-icon"
        />
        <p>
          Du möchtest mit einem Partner gegen zwei andere Spieler spielen. Wer
          dein Partner ist, musst du erst noch herausfinden.
        </p>
      </div>

      <div class="flex-container">
        <selectable-box
          v-model="reservation"
          selected-value="gesund"
          :selected="reservation === 'gesund'"
          class="flex-item"
        >
          <img
            src="@/assets/img/healthy.png"
            alt="healthy icon"
            class="reservation-icon"
          />
          <div class="flex-col">
            <h3 class="large-text">Gesund!</h3>
            <p class="regular-text">
              Du möchtest ein normales Spiel spielen und meldest keinen
              Vorbehalt an.
            </p>
          </div>
        </selectable-box>

        <selectable-box
          v-model="reservation"
          selected-value="hochzeit"
          class="flex-item"
          disabled
        >
          <img
            src="@/assets/img/rings.png"
            alt="wedding icon"
            class="reservation-icon"
          />
          <div class="flex-col">
            <h3 class="large-text">
              Hochzeit <span class="badge">Coming soon!</span>
            </h3>
            <p class="regular-text">
              Du hast beide Re-Damen. Wer den ersten Stich gewinnt, wird dein
              Partner.
            </p>
          </div>
        </selectable-box>
      </div>

      <div class="flex-container">
        <h2>Solo</h2>
        <div class="flex-row">
          <img
            src="@/assets/img/team.png"
            alt="solo icon"
            class="reservation-icon"
          />
          <p>
            Du spielst allein gegen die drei anderen Spieler. Gewinnst du,
            erhältst du die dreifache Punktzahl.
          </p>
        </div>

        <div class="flex-container">
          <selectable-box
            v-model="reservation"
            selected-value="damensolo"
            :selected="reservation === 'damensolo'"
            class="flex-item"
          >
            <div class="flex-col centered-col">
              <img
                src="@/assets/img/queen.png"
                alt="queen icon"
                class="reservation-icon"
              />
              <p class="regular-text bold">Damensolo</p>
              <small> Damen sind Trumpf, alle anderen Karten sind Fehl. </small>
            </div>
          </selectable-box>

          <selectable-box
            v-model="reservation"
            selected-value="bubensolo"
            :selected="reservation === 'bubensolo'"
            class="flex-item"
          >
            <div class="flex-col centered-col">
              <img
                src="@/assets/img/jack.png"
                alt="jack icon"
                class="reservation-icon"
              />
              <p class="regular-text bold">Bubensolo</p>
              <small> Buben sind Trumpf, alle anderen Karten sind Fehl. </small>
            </div>
          </selectable-box>

          <div class="solo-selector">
            <div class="solo selectable" tabindex="0">
              <img
                src="@/assets/img/heart.png"
                alt="heart icon"
                class="reservation-icon"
              />
              <input id="kreuzsolo" type="radio" name="solo" value="kreuzsolo" />
              <label for="kreuzsolo">
                Farbsolo
                <small>Kreuz ersetzt Karo als Trumpffarbe</small>
              </label>
            </div>
            <div class="solo-suits">
              <div class="suit-box black">♣</div>
              <div class="suit-box black active">♠</div>
              <div class="suit-box red">♥</div>
              <div class="suit-box red">♦</div>
            </div>
          </div>

          <selectable-box
            v-model="reservation"
            selected-value="fleischloser"
            :selected="reservation === 'fleischloser'"
            class="flex-item"
          >
            <div class="flex-col centered-col">
              <img
                src="@/assets/img/skeleton.png"
                alt="skeleton icon"
                class="reservation-icon"
              />
              <p class="regular-text bold">Fleischloser</p>
              <small>
                Es gibt keine Trümpfe, alle Karten sind Fehl und werden
                eingereiht
              </small>
            </div>
          </selectable-box>
        </div>
      </div>
    </div>

    <div>
      <button type="button" class="button">Vorbehalt anmelden</button>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { Game } from "@/models/game";
import Modal from "@/components/Modal.vue";
import Hand from "@/components/Hand.vue";
import { PropType, ref } from "vue";
import SelectableBox from "./reservations/SelectableBox.vue";

defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  },
});

const reservation = ref("");
</script>

<style scoped>
@import "../assets/css/vars.css";

p {
  color: var(--black);
}

h2 {
  margin-bottom: 4px;
}
.dark-box {
  background: var(--white-100);
  padding: 16px;
  border: 1px solid var(--white-300);
  border-top: none;
  border-radius: 0 0 6px 6px;
  margin-bottom: 24px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.flex-item {
  flex: 1 0 0;
  flex-basis: 0;
  flex-shrink: 1;
}

.selectable {
  cursor: pointer;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.centered-col {
  align-items: center;
  text-align: center;
}

.large-text {
  font-size: 1.4em;
  margin: 0;
}

.bold {
  font-weight: bold;
}

.regular-text {
  margin: 0;
}

.badge {
  font-family: sans-serif;
  font-weight: regular;
  font-style: normal;
  display: inline-block;
  color: var(--white);
  background: var(--lightblue);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 6px;
  margin-bottom: 4px;
  vertical-align: middle;
}

.hand-wrapper {
  border-radius: 8px 8px 0 0;
  background: var(--black);
  padding: 24px;
  border: 1px solid var(--black);
  border-bottom: none;
}

.solo {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  border-radius: 8px;
  border: 1px solid var(--white-400);
  background: var(--white);
}

.solo-selector {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
}

.solo-selector .solo {
  border-radius: 8px 8px 0 0;
}

.solo-suits {
  display: flex;
  justify-content: space-between;
}

.suit-box {
  padding: 8px 6px;
  margin-top: -2px;
  background-color: var(--white-050);
  border: 1px solid var(--white-400);
  border-right: none;
  width: 100%;
  text-align: center;
  border-radius: 0 0 8px 8px;
}

.solo:hover ~ .solo-suits .suit-box {
  border-color: var(--white-500);
}

.suit-box.active {
  background-color: var(--white);
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.suit-box:last-of-type {
  border: 1px solid var(--white-400);
}

.suit-box.red {
  color: var(--red);
}

.suit-box.black {
  color: var(--black);
}
.solo input {
  display: none;
}

.solo label {
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  font-weight: bold;
}

.solo small {
  margin-top: 4px;
  font-weight: normal;
  font-style: italic;
}

.reservation-icon {
  max-width: 64px;
  max-height: 64px;
}
</style>
