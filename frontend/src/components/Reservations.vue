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
      <h1>Spiel mit Partner</h1>
      <p>
        Du möchtest mit einem Partner gegen zwei andere Spieler spielen. Wer
        dein Partner ist, musst du erst noch herausfinden.
      </p>
      <div class="reservations-wrapper">
        <div class="reservation selectable" tabindex="0">
          <h2>Gesund!</h2>
          <div class="description">
            <img
              src="@/assets/img/healthy.png"
              alt="healthy icon"
              class="reservation-icon"
            />
            <p>
              Du möchtest ein normales Spiel spielen und meldest keinen
              Vorbehalt an.
            </p>
          </div>
        </div>

        <div class="reservation disabled">
          <h2>Hochzeit</h2>
          <span class="badge">coming soon</span>
          <div class="description">
            <img
              src="@/assets/img/rings.png"
              alt="wedding icon"
              class="reservation-icon"
            />
            <p>
              Du hast beide Re-Damen. Wer den ersten Stich gewinnt, wird dein
              Partner.
            </p>
          </div>
        </div>
      </div>

      <div class="reservation-wrapper solos">
        <h1>Solo</h1>
        <div class="description">
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

        <div class="solo-wrapper">
          <div class="solo selectable" tabindex="0">
            <img
              src="@/assets/img/queen.png"
              alt="queen icon"
              class="reservation-icon"
            />
            <input id="damensolo" type="radio" name="solo" value="damensolo" />
            <label for="damensolo">
              Damensolo
              <small>Damen sind Trumpf, alle anderen Karten sind Fehl</small>
            </label>
          </div>

          <div class="solo selectable" tabindex="0">
            <img
              src="@/assets/img/jack.png"
              alt="jack icon"
              class="reservation-icon"
            />
            <input id="bubensolo" type="radio" name="solo" value="bubensolo" />
            <label for="bubensolo">
              Bubensolo
              <small>Buben sind Trumpf, alle anderen Karten sind Fehl</small>
            </label>
          </div>

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

          <div class="solo selectable" tabindex="0">
            <img
              src="@/assets/img/skeleton.png"
              alt="skeleton icon"
              class="reservation-icon"
            />
            <input
              id="fleischlos"
              type="radio"
              name="solo"
              value="fleischlos"
            />
            <label for="fleischlos">
              Fleischloser
              <small>
                Es gibt keine Trümpfe, alle Karten sind Fehl und werden
                eingereiht
              </small>
            </label>
          </div>
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
import VueFeather from "vue-feather";

defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  },
});

const showVorbehalt = ref(false);
</script>

<style scoped>
@import "../assets/css/vars.css";

p {
  color: var(--black);
}

.dark-box {
  background: var(--white-100);
  padding: 16px;
  border: 1px solid var(--white-300);
  border-top: none;
  border-radius: 0 0 6px 6px;
  margin-bottom: 24px;
}
.reservations-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.selectable {
  cursor: pointer;
}

.reservation {
  min-width: 200px;
  padding: 16px;
  flex: 1 1 0px;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid var(--white-400);
  background: var(--white);
}

.reservation:hover,
.reservation:active,
.solo:hover,
.solo:active {
  border-color: var(--white-600);
}

.reservation.selected {
  border-color: var(--red-dark);
}

.reservation.disabled {
  opacity: 0.6;
}

.reservation h2 {
  margin-top: 0;
  display: inline-block;
}

.badge {
  display: inline-block;
  color: var(--white);
  background: var(--lightblue);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: 6px;
}

.description {
  display: flex;
  align-items: top;
  gap: 16px;
  margin-bottom: 12px;
}

.description i {
  flex-shrink: 0;
}

.description p {
  margin: 0;
}

.hand-wrapper {
  border-radius: 8px 8px 0 0;
  background: var(--black);
  padding: 24px;
  border: 1px solid var(--black);
  border-bottom: none;
}

.solo-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.solos {
  padding: 12px;
  border-radius: 8px;
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

input {
  accent-color: var(--red);
}

input:checked + label {
  color: var(--red);
}

.reservation-icon {
  max-width: 64px;
  max-height: 64px;
}
</style>
