<template>
  <modal :visible="true">
    <h2>Alle Gesund?</h2>
    <p>
      Hier sind deine Karten.<br />
      Willst du ein normales Spiel oder ein Sonderspiel spielen?
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

    <div class="reservations-wrapper">
      <div class="reservation">
        <h3>Gesund!</h3>
        <div class="description">
          <vue-feather type="heart" size="36" />
          <p>
            Du möchtest ein normales Spiel spielen und meldest keinen Vorbehalt
            an.
          </p>
        </div>
      </div>

      <div class="reservation disabled">
        <h3>Hochzeit</h3>
        <span class="badge">coming soon</span>
        <div class="description">
          <vue-feather type="bell" size="36" />
          <p>
            Du hast beide Re-Damen. Wer den ersten Stich gewinnt, wird dein
            Partner.
          </p>
        </div>
      </div>
    </div>

    <div class="reservation-wrapper">
      <div class="reservation">
        <h3>Solo</h3>
        <div class="description">
          <vue-feather type="user" size="36" />
          <p>
            Du spielst allein gegen die drei anderen Spieler. Die
            Kartenreihenfolge ändert sich je nach Solo.
          </p>
        </div>

        <div class="solo">
          <input id="damensolo" type="radio" name="solo" value="damensolo" />
          <label for="damensolo">
            Damensolo
            <small>Damen sind Trumpf, alle anderen Karten sind Fehl</small>
          </label>
        </div>

        <div class="solo">
          <input id="bubensolo" type="radio" name="solo" value="bubensolo" />
          <label for="bubensolo">
            Bubensolo
            <small>Buben sind Trumpf, alle anderen Karten sind Fehl</small>
          </label>
        </div>

        <div class="solo">
          <input id="kreuzsolo" type="radio" name="solo" value="kreuzsolo" />
          <label for="kreuzsolo">
            Kreuzsolo
            <small> Kreuz ersetzt Karo als Trumpffarbe </small>
          </label>
        </div>

        <div class="solo">
          <input id="piksolo" type="radio" name="solo" value="piksolo" />
          <label for="piksolo">
            Piksolo
            <small>Pik ersetzt Karo als Trumpffarbe</small>
          </label>
        </div>

        <div class="solo">
          <input id="herzsolo" type="radio" name="solo" value="herzsolo" />
          <label for="herzsolo">
            Herzsolo
            <small>Herz ersetzt Karo als Trumpffarbe</small>
          </label>
        </div>

        <div class="solo">
          <input id="karosolo" type="radio" name="solo" value="karosolo" />
          <label for="karosolo">
            Karosolo
            <small>Die Kartenreihenfolge bleibt, aber du spielst alleine</small>
          </label>
        </div>

        <div class="solo">
          <input id="fleischlos" type="radio" name="solo" value="fleischlos" />
          <label for="fleischlos">
            Fleischloser
            <small>
              Es gibt keine Trümpfe, alle Karten sind Fehl und werden eingereiht
            </small>
          </label>
        </div>

        <button type="button" class="button">Solo</button>
      </div>
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

.reservations-wrapper {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.reservation {
  padding: 16px;
  flex: 1 1 0px;
  margin: 12px 0;
  border: 2px solid var(--lightblue);
}

.reservation.disabled {
  border: 2px dashed var(--lightblue);
  opacity: 0.5;
}

.reservation h3 {
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
  border-radius: 8px;
  background: var(--black);
  padding: 24px;
}

.solo {
  display: flex;
  align-items: flex-start;
}

.solo input {
  margin-top: 2px;
}

.solo label {
  display: inline-flex;
  flex-direction: column;
  margin-left: 12px;
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

.solo {
  margin: 24px 0;
}
</style>
