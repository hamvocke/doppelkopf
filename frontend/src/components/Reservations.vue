<template>
  <modal :visible="true">
    <h2>Alle Gesund?</h2>
    <hr />
    <p>Hier ist deine Hand:</p>

    <hand
      :hand="game.players[0].hand"
      :position="game.players[0].tablePosition"
      :is-selectable="false"
      :is-covered="false"
      :playable-cards="[]"
    />
    <p>
      Willst du ein normales Spiel oder ein Sonderspiel spielen?
    </p>

    <div class="reservations-wrapper">
      <div class="reservation-group">
        <h3>Gesund</h3>
        <p>
          Du meldest keinen Vorbehalt an und möchtest ein normales Spiel
          spielen.
        </p>
        <button type="button" class="button">Gesund</button>
      </div>

      <div v-if="!showVorbehalt" class="reservation-group">
        <h3>Vorbehalt</h3>
        <p>
          Du möchtest ein Sonderspiel spielen.
        </p>
        <button type="button" class="button" @click="showVorbehalt = true">Vorbehalt</button>
      </div>

      <div v-if="showVorbehalt" class="reservation-group">
        <h3>Solo</h3>
        <p>
          Du spielst allein gegen die drei anderen Spieler. Nur Karten deines
          angesagten Solos sind Trumpf, alle anderen Karten sind Fehl.
        </p>

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
            <small>
              Kreuz ersetzt Karo als Trumpffarbe
            </small>
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

      <div v-if="showVorbehalt" class="reservation-group">
        <h3>Hochzeit</h3>
        <p>
          Du hast beide Re-Damen und meldest eine Hochzeit an. Wer den ersten
          Stich gewinnt, spielt mit dir zusammen.
        </p>
        <button type="button" class="button">Hochzeit</button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Game } from "@/models/game";
import Modal from "@/components/Modal.vue";
import Hand from "@/components/Hand.vue";

@Component({ components: { Modal, Hand } })
export default class Reservations extends Vue {
  @Prop({ required: true })
  game!: Game;

  showVorbehalt = false;
}
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

.reservation-group {
  padding: 8px;
  flex: 1 100%;
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

.solo {
  margin: 24px 0;
}
</style>
