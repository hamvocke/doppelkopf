import VueI18n from "vue-i18n";

import Player from "@/components/Player";
import { Game } from "@/models/game";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Player"
};

let game = Game.singlePlayer();

export const myself = () => ({
  components: { Player },
  data() {
    return {
      player: game.players[0]
    };
  },
  template: '<Player :player="player" />',
  i18n: new VueI18n(i18nOpts)
});
