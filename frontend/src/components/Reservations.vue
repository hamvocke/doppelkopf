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

      <div class="reservation-group">
        <h3>Solo</h3>
        <p>
          Du spielst ein Solo, allein gegen die drei anderen Spieler. Nur Karten
          deines angesagten Solos sind Trumpf, alle anderen Karten sind Fehl.
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
            Kreuz-Solo
            <small>
              Kreuzkarten sind Trumpf, alle anderen Karten sind Fehl
            </small>
          </label>
        </div>

        <div class="solo">
          <input id="piksolo" type="radio" name="solo" value="piksolo" />
          <label for="piksolo">
            Pik-Solo
            <small>Pikkarten sind Trumpf, alle anderen Karten sind Fehl</small>
          </label>
        </div>

        <div class="solo">
          <input id="herzsolo" type="radio" name="solo" value="herzsolo" />
          <label for="herzsolo">
            Herz-Solo
            <small>Herzkarten sind Trumpf, alle anderen Karten sind Fehl</small>
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
      </div>

      <div class="reservation-group">
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
}
</script>

<style scoped>
@import "../assets/css/vars.css";

p {
  color: var(--black);
}

.reservations-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.reservation-group {
  flex-grow: 1;
  padding: 8px;
  margin: 8px;
}
</style>
