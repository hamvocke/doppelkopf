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

var model = new WaitingRoomModel();
var player = new Player("Karl-Heinz", true, true);
model.join(player);

export default {
  title: "Waiting Room"
};

export const waitingRoom = () => ({
  components: { WaitingRoom },
  data() {
    return {
      waitingRoom: model
    };
  },
  template: "<WaitingRoom :waitingRoom='waitingRoom' />",
  i18n: new VueI18n(i18nOpts)
});
