import VueI18n from "vue-i18n";

import Player from "@/components/Player";
import { Game } from "@/models/game";
import { Announcement } from "@/models/announcements";

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
let bottomPlayer = game.players[0];
let leftPlayer = game.players[1];

function fakeAnnouncements(player) {
  if (player.isRe()) {
    player.announce(Announcement.Re);
  } else {
    player.announce(Announcement.Kontra);
  }
  player.announce(Announcement.No90);
  player.announce(Announcement.No60);
}

fakeAnnouncements(bottomPlayer);
fakeAnnouncements(leftPlayer);

export const myself = () => ({
  components: { Player },
  data() {
    return {
      player: bottomPlayer
    };
  },
  template: '<Player :player="player" class="bottom" />',
  i18n: new VueI18n(i18nOpts)
});

export const left = () => ({
  components: { Player },
  data() {
    return {
      player: leftPlayer
    };
  },
  template: '<Player :player="player" class="left" />',
  i18n: new VueI18n(i18nOpts)
});
