import VueI18n from "vue-i18n";

import AnnouncementsButton from "@/components/AnnouncementsButton";
import { Game } from "@/models/game";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

const game = Game.singlePlayer();

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Announcement Button"
};

export const standard = () => ({
  components: { AnnouncementsButton },
  data() {
    return {
      player: game.players[0]
    };
  },
  template: `
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <AnnouncementsButton :player="player" />
  </div>`,
  i18n: new VueI18n(i18nOpts)
});
