import VueI18n from "vue-i18n";

import WaitingRoom from "@/views/WaitingRoom";
import { WaitingRoom as WaitingRoomModel } from "@/models/waitingRoom";
import { Player } from "@/models/player";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

var player = new Player("Karl-Heinz", true, false);
var player2 = new Player("Brigitte", true, true);
var player3 = new Player("Johnny", true, false);
var player4 = new Player("Svenja", true, false);

var waitingModel = new WaitingRoomModel();
waitingModel.join(player);

var joinedModel = new WaitingRoomModel();
joinedModel.join(player);
joinedModel.join(player2);

var readyModel = new WaitingRoomModel();
readyModel.join(player);
readyModel.join(player2);
readyModel.join(player3);
readyModel.join(player4);

export default {
  title: "Waiting Room"
};

export const waitingWaitingRoom = () => ({
  components: { WaitingRoom },
  data() {
    return {
      waitingRoom: waitingModel
    };
  },
  template: "<WaitingRoom :waitingRoom='waitingRoom' />",
  i18n: new VueI18n(i18nOpts)
});

export const joinedWaitingRoom = () => ({
  components: { WaitingRoom },
  data() {
    return {
      waitingRoom: joinedModel
    };
  },
  template: "<WaitingRoom :waitingRoom='waitingRoom' />",
  i18n: new VueI18n(i18nOpts)
});

export const readyWaitingRoom = () => ({
  components: { WaitingRoom },
  data() {
    return {
      waitingRoom: readyModel
    };
  },
  template: "<WaitingRoom :waitingRoom='waitingRoom' />",
  i18n: new VueI18n(i18nOpts)
});
